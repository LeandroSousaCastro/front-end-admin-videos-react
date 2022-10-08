export interface Results {
  data: CastMember[];
  meta: Meta;
  // links?: Links;
}

export interface Result {
  data: CastMember;
  meta: Meta;
  // links?: Links;
}

// export interface Links {
//   prev: null;
//   last: string;
//   next: string;
//   first: string;
// }

export interface CastMember {
  id: string;
  name: string;
  type: number;
  created_at: string;
  // updated_at?: string;
  // deleted_at?: string;
}

export interface Meta {
  to: number;
  from: number;
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
