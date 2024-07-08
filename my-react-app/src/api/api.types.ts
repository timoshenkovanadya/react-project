export type Animal = {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
};

export type ResponseType = {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  sort: {
    clauses: string[];
  };
  animals: Animal[];
};
