import type {
  Employee,
  EmployeeCategoryResponse,
  EmployeeResponse,
  SectionServiceEntity,
  SectionServiceEntityResponse,
  SubsectionServiceEntityResponse,
} from "./types";
const BASE_URL = import.meta.env.VITE_API_URL as string;

// ─── Section Service Entities ─────────────────────────────────────────────────

export async function fetchSectionServiceEntities(): Promise<SectionServiceEntityResponse> {
  const response = await fetch(
    `${BASE_URL}/section-service-entities?populate=thumbnail`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch section-service-entities: ${response.status}`,
    );
  }
  return response.json() as Promise<SectionServiceEntityResponse>;
}

// ─── Subsection Service Entities ──────────────────────────────────────────────

export async function fetchSubsectionServiceEntities(): Promise<SubsectionServiceEntityResponse> {
  const response = await fetch(
    `${BASE_URL}/subsection-service-entities?populate=*`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch subsection-service-entities: ${response.status}`,
    );
  }
  return response.json() as Promise<SubsectionServiceEntityResponse>;
}

/**
 * Fetch subsections filtered by a specific section documentId.
 */
export async function fetchSubsectionsBySection(
  sectionDocumentId: string,
): Promise<SubsectionServiceEntityResponse> {
  const params = new URLSearchParams({
    "filters[section_service_entity][documentId][$eq]": sectionDocumentId,
    populate: "*",
  });
  const response = await fetch(
    `${BASE_URL}/subsection-service-entities?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch subsections for section ${sectionDocumentId}: ${response.status}`,
    );
  }
  return response.json() as Promise<SubsectionServiceEntityResponse>;
}

// ─── Employees ────────────────────────────────────────────────────────────────

export async function fetchEmployees(): Promise<EmployeeResponse> {
  const response = await fetch(`${BASE_URL}/employees?populate=photo`);
  if (!response.ok) {
    throw new Error(`Failed to fetch employees: ${response.status}`);
  }
  return response.json() as Promise<EmployeeResponse>;
}

// ─── Employee Categories ──────────────────────────────────────────────────────

export async function fetchEmployeeCategories(): Promise<EmployeeCategoryResponse | null> {
  const response = await fetch(`${BASE_URL}/employee-categories?populate=*`);
  // 403 means the collection isn't publicly accessible in Strapi yet — return null to use static fallback
  if (response.status === 403) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch employee-categories: ${response.status}`);
  }
  return response.json() as Promise<EmployeeCategoryResponse>;
}

// ─── Single Section Service Entity ───────────────────────────────────────────

export async function fetchSectionServiceEntityByDocumentId(
  documentId: string,
): Promise<{ data: SectionServiceEntity }> {
  const response = await fetch(
    `${BASE_URL}/section-service-entities/${documentId}?populate=thumbnail`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch section-service-entity ${documentId}: ${response.status}`,
    );
  }
  return response.json() as Promise<{ data: SectionServiceEntity }>;
}

// ─── Employees by Category ────────────────────────────────────────────────────

export async function fetchEmployeesByCategory(
  categoryDocumentId: string,
): Promise<EmployeeResponse> {
  const params = new URLSearchParams({
    "filters[employee_categories][documentId][$eq]": categoryDocumentId,
    populate: "photo",
  });
  const response = await fetch(`${BASE_URL}/employees?${params.toString()}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch employees for category ${categoryDocumentId}: ${response.status}`,
    );
  }
  return response.json() as Promise<EmployeeResponse>;
}

// ─── Single Employee ──────────────────────────────────────────────────────────

export async function fetchEmployeeByDocumentId(
  documentId: string,
): Promise<{ data: Employee }> {
  const response = await fetch(
    `${BASE_URL}/employees/${documentId}?populate=photo`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch employee ${documentId}: ${response.status}`,
    );
  }
  return response.json() as Promise<{ data: Employee }>;
}
