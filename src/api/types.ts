// ─── Pagination Meta ─────────────────────────────────────────────────────────

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// ─── Strapi Image ────────────────────────────────────────────────────────────

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
  name: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

// ─── Section Service Entity (/api/section-service-entities) ──────────────────

export interface SectionServiceEntity {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: StrapiImage | null;
}

export type SectionServiceEntityResponse = StrapiResponse<SectionServiceEntity>;

// ─── Subsection Service Entity (/api/subsection-service-entities) ─────────────

export interface SubsectionServiceEntity {
  id: number;
  documentId: string;
  title: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: StrapiImage | null;
  section_service_entity: SectionServiceEntity;
}

export type SubsectionServiceEntityResponse =
  StrapiResponse<SubsectionServiceEntity>;

// ─── Employee (/api/employees) ────────────────────────────────────────────────

export interface Employee {
  id: number;
  documentId: string;
  fullName: string;
  description: string;
  /** Years of experience */
  expirience: number;
  position: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photo?: StrapiImage | null;
}

export type EmployeeResponse = StrapiResponse<Employee>;

// ─── Employee Category (/api/employee-categories) ────────────────────────────

export interface EmployeeCategory {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon?: StrapiImage | null;
  employees?: Employee[];
}

export type EmployeeCategoryResponse = StrapiResponse<EmployeeCategory>;

// ─── Contact (/api/contact) ─────────────────────────────────────────────────

export interface ContactPhoneNumbers {
  INN_line?: string | null;
  OGRN_line?: string | null;
  company_description?: string | null;
}

export interface ContactAddresses {
  main_mail?: string | null;
}

export interface ContactEntity {
  id: number;
  documentId: string;
  phone_numbers?: ContactPhoneNumbers | null;
  adresses?: ContactAddresses | null;
  emails?: unknown;
  links?: unknown;
  coordinates?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type ContactResponse = StrapiSingleResponse<ContactEntity>;
