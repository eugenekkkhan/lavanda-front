import React from "react";
import LoadingCircle from "../atoms/LoadingCircle/LoadingCircle";

interface MarkdownNode {
  type: "text" | "bold" | "italic" | "link" | "image" | "paragraph" | "svg";
  content?: string;
  children?: MarkdownNode[];
  href?: string;
  src?: string;
  svgContent?: string;
}

/**
 * Inject theme color into SVG content by replacing fill and stroke attributes.
 * Handles multiple SVG element types (paths, shapes, groups, etc.)
 * and preserves intentional fill="none" attributes.
 */
function injectSvgThemeColor(
  svgContent: string,
  fillColor: string,
  strokeColor: string = fillColor,
): string {
  let result = svgContent;

  // All common SVG shape elements that can have fill/stroke
  const shapeElements = [
    "path",
    "circle",
    "rect",
    "ellipse",
    "polygon",
    "polyline",
    "line",
    "g",
    "text",
    "tspan",
    "use",
  ];

  // Process each shape element type
  shapeElements.forEach((tag) => {
    // Match both self-closing and regular tags
    const regex = new RegExp(
      `<${tag}([^>]*?)(\\s*/?\\s*)>`,
      "g"
    );

    result = result.replace(regex, (match, attrs, closingSlash) => {
      // Preserve intentional fill="none"
      if (
        attrs.includes('fill="none"') ||
        attrs.includes("fill='none'")
      ) {
        return match;
      }

      // Update or add fill attribute
      let updated = attrs;

      if (/fill\s*=/.test(attrs)) {
        // Replace existing fill
        updated = updated.replace(
          /fill\s*=\s*["']([^"']*)["']/g,
          `fill="${fillColor}"`
        );
      } else {
        // Add fill if not present
        updated += ` fill="${fillColor}"`;
      }

      // Update or add stroke attribute
      if (/stroke\s*=/.test(updated)) {
        updated = updated.replace(
          /stroke\s*=\s*["']([^"']*)["']/g,
          `stroke="${strokeColor}"`
        );
      } else {
        updated += ` stroke="${strokeColor}"`;
      }

      return `<${tag}${updated}${closingSlash}>`;
    });
  });

  // Also handle colors in style attributes (inline styles)
  result = result.replace(
    /style\s*=\s*["']([^"']*)["']/g,
    (_match, styleContent) => {
      let updatedStyle = styleContent;
      // Replace fill color in inline styles
      updatedStyle = updatedStyle.replace(
        /fill\s*:\s*[^;]*/g,
        `fill: ${fillColor}`
      );
      // Replace stroke color in inline styles
      updatedStyle = updatedStyle.replace(
        /stroke\s*:\s*[^;]*/g,
        `stroke: ${strokeColor}`
      );
      return `style="${updatedStyle}"`;
    }
  );

  // Normalize root svg sizing so it is responsive inside layout containers.
  result = result.replace(/<svg([^>]*)>/i, (_match, attrs) => {
    let updated = attrs;

    if (/width\s*=/.test(updated)) {
      updated = updated.replace(/width\s*=\s*["']([^"']*)["']/g, 'width="100%"');
    } else {
      updated += ' width="100%"';
    }

    // Remove fixed height to preserve aspect ratio from viewBox.
    updated = updated.replace(/height\s*=\s*["']([^"']*)["']/g, "");

    if (/style\s*=/.test(updated)) {
      updated = updated.replace(
        /style\s*=\s*["']([^"']*)["']/g,
        (_styleMatch: string, styleContent: string) =>
          `style="${styleContent};display:block;max-width:100%;height:auto;"`,
      );
    } else {
      updated += ' style="display:block;max-width:100%;height:auto;"';
    }

    return `<svg${updated}>`;
  });

  return result;
}

/**
 * Parse markdown text with support for:
 * - **bold**
 * - *italic*
 * - [link](url)
 * - ![image](url)
 * - ![svg](url.svg) for SVG injection
 */
export function parseMarkdown(markdown: string): MarkdownNode[] {
  const nodes: MarkdownNode[] = [];

  // Regex patterns
  const patterns = [
    // SVG images with markdown syntax ![alt](url.svg)
    {
      regex: /!\[([^\]]*?)\]\((https?:\/\/[^\s\)]+\.svg)\)/g,
      type: "image" as const,
      isSvg: true,
    },
    // Regular images ![alt](url)
    {
      regex: /!\[([^\]]*?)\]\((https?:\/\/[^\s\)]+)\)/g,
      type: "image" as const,
      isSvg: false,
    },
    // Links [text](url)
    {
      regex: /\[([^\]]+?)\]\((https?:\/\/[^\s\)]+)\)/g,
      type: "link" as const,
    },
    // Bold **text**
    {
      regex: /\*\*([^\*]+?)\*\*/g,
      type: "bold" as const,
    },
    // Italic *text*
    {
      regex: /\*([^\*]+?)\*/g,
      type: "italic" as const,
    },
  ];

  let lastIndex = 0;
  let match;

  // Find all matches and sort by position
  const allMatches: Array<{
    start: number;
    end: number;
    type: string;
    groups: string[];
    isSvg?: boolean;
  }> = [];

  patterns.forEach((pattern) => {
    const regex = new RegExp(pattern.regex.source, "g");
    while ((match = regex.exec(markdown)) !== null) {
      allMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: pattern.type,
        groups: Array.from(match).slice(1),
        isSvg: pattern.isSvg,
      });
    }
  });

  // Sort matches by start position
  allMatches.sort((a, b) => a.start - b.start);

  // Remove overlapping matches
  const nonOverlappingMatches = allMatches.filter((match, idx) => {
    for (let i = 0; i < idx; i++) {
      const prev = allMatches[i];
      if (match.start < prev.end) {
        return false; // This match overlaps with a previous one
      }
    }
    return true;
  });

  // Process matches
  nonOverlappingMatches.forEach((m) => {
    // Add text before this match
    if (m.start > lastIndex) {
      const textContent = markdown.substring(lastIndex, m.start);
      if (textContent) {
        nodes.push({ type: "text", content: textContent });
      }
    }

    if (m.type === "image") {
      if (m.isSvg) {
        // SVG image - fetch and inject colors
        nodes.push({
          type: "svg",
          src: m.groups[1],
          content: m.groups[0],
        });
      } else {
        // Regular image
        nodes.push({
          type: "image",
          src: m.groups[1],
          content: m.groups[0],
        });
      }
    } else if (m.type === "link") {
      nodes.push({
        type: "link",
        href: m.groups[1],
        children: [{ type: "text", content: m.groups[0] }],
      });
    } else {
      // Bold, italic
      nodes.push({
        type: m.type as "bold" | "italic",
        children: [{ type: "text", content: m.groups[0] }],
      });
    }

    lastIndex = m.end;
  });

  // Add remaining text
  if (lastIndex < markdown.length) {
    const remaining = markdown.substring(lastIndex);
    if (remaining) {
      nodes.push({ type: "text", content: remaining });
    }
  }

  return nodes;
}

interface MarkdownRendererProps {
  markdown: string;
  themeColors?: { fill?: string; stroke?: string };
  className?: string;
}

/**
 * React component to render parsed markdown with theme color support for SVGs.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  themeColors,
  className = "",
}) => {
  const [svgCache, setSvgCache] = React.useState<Record<string, string>>({});

  const defaultColors = {
    fill: themeColors?.fill || "#404040",
    stroke: themeColors?.stroke || "#404040",
  };

  React.useEffect(() => {
    const nodes = parseMarkdown(markdown);
    const svgNodes = nodes.filter((n) => n.type === "svg" && n.src);

    // Clear cache when colors change to force re-coloring
    setSvgCache({});

    svgNodes.forEach(async (node) => {
      if (!node.src) return;

      try {
        const response = await fetch(node.src);
        let svgContent = await response.text();
        svgContent = injectSvgThemeColor(
          svgContent,
          defaultColors.fill,
          defaultColors.stroke,
        );
        setSvgCache((prev) => ({ ...prev, [node.src!]: svgContent }));
      } catch (err) {
        console.warn(`Failed to load SVG from ${node.src}:`, err);
      }
    });
  }, [markdown, defaultColors.fill, defaultColors.stroke]);

  const nodes = parseMarkdown(markdown);

  const renderNode = (node: MarkdownNode, index: number): React.ReactNode => {
    switch (node.type) {
      case "text":
        return node.content;
      case "bold":
        return (
          <strong key={index} className="font-bold">
            {node.children?.map((child, i) => renderNode(child, i))}
          </strong>
        );
      case "italic":
        return (
          <em key={index} className="italic">
            {node.children?.map((child, i) => renderNode(child, i))}
          </em>
        );
      case "link":
        return (
          <a
            key={index}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {node.children?.map((child, i) => renderNode(child, i))}
          </a>
        );
      case "image":
        return (
          <img
            key={index}
            src={node.src}
            alt={node.content || "image"}
            className="max-w-full h-auto my-2"
          />
        );
      case "svg":
        if (!node.src) return null;
        const cachedSvg = svgCache[node.src];
        if (cachedSvg) {
          return (
            <div
              key={index}
              className="w-full"
              dangerouslySetInnerHTML={{ __html: cachedSvg }}
            />
          );
        }
        return (
          <div
            key={index}
            className="w-full text-gray-500 flex items-center justify-center"
            style={{ minHeight: "48px" }}
          >
            <LoadingCircle />
          </div>
        );
      default:
        return null;
    }
  };

  const renderNodesWithSvgRows = (): React.ReactNode[] => {
    const rendered: React.ReactNode[] = [];
    let svgRun: MarkdownNode[] = [];

    const flushSvgRun = (key: number) => {
      if (!svgRun.length) return;
      rendered.push(
        <div key={`svg-row-${key}`} className="my-2 flex flex-wrap items-center w-full gap-8">
          {svgRun.map((svgNode, svgIndex) => (
            <div
              key={`svg-item-${key}-${svgIndex}`}
              className="flex-1 max-w-[120px] min-w-[30px] h-[30px] flex items-center justify-center"
            >
              {renderNode(svgNode, svgIndex)}
            </div>
          ))}
        </div>,
      );
      svgRun = [];
    };

    nodes.forEach((node, index) => {
      if (node.type === "svg") {
        svgRun.push(node);
        return;
      }

      // Treat whitespace between SVG nodes as part of the same SVG row.
      if (node.type === "text" && !node.content?.trim() && svgRun.length > 0) {
        return;
      }

      flushSvgRun(index);
      rendered.push(renderNode(node, index));
    });

    flushSvgRun(nodes.length);

    return rendered;
  };

  return (
    <div className={className}>
      {renderNodesWithSvgRows()}
    </div>
  );
};

export default MarkdownRenderer;
