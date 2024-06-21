export interface UsersResponse {
    data:    Users[];
    length:  number;
    message: string;
    success: boolean;
}

export interface Users {
    id:             number;
    identifier:     number;
    lastName:       string;
    name:           string;
    positionName:   string;
    retirementDate: null | string;
}