export interface Results {
  data: CastMember[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: CastMember;
  meta: Meta;
  links: Links;
}

export interface Links {
  prev: null;
  last: string;
  next: string;
  first: string;
}

export interface CastMember {
  id: string;
  name: string;
  type: number;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
