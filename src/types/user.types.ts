export type UserType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: RoleEnumType;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    phoneNumber?: string | null;
    profilePictureUrl?: string | null;
}