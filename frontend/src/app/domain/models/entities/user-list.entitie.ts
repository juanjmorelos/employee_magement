export interface UserListResponse {
    data:    UsersList[];
    length:  number;
    message: string;
    success: boolean;
}

export interface UsersList {
    id:             number;
    identifier:     number;
    lastName:       string;
    name:           string;
    positionName:   string;
    retirementDate: null | string;
}