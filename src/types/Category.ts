export interface Results {
  data: Category[];
  meta: Meta;
  // links: Links;
}

export interface Result {
  data: Category;
  meta: Meta;
  // links: Links;
}

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
  // updated_at: string;
  // deleted_at: null | string;
}

// export interface Links {
//   prev: null;
//   last: string;
//   next: string;
//   first: string;
// }

export interface Meta {
  to: number;
  from: number;
  // path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
