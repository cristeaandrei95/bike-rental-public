export enum Role {
  ANONYMOUS = "ANONYMOUS",
  MANAGER = "MANAGER",
  USER = "USER",
}

export interface User {
  id: string | null;
  name: string | null;
  role: Role;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface NewRegisteredUser extends LoginCredentials {
  name: string;
  phone: string;
}

export interface ResetCredentials extends LoginCredentials {
  tempPassword: string;
}

export interface Pagination {
  page: number;
  perPage: number;
}

export interface BikeByIDParams {
  id: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  dropoffDate?: string;
}

export interface BikeParams extends Pagination {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  dropoffDate?: string;
  model?: string;
  color?: string;
  rating?: string;
}

export interface DetailedUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: Role;
}

export interface UsersResponse extends Pagination {
  users: DetailedUser[];
}

export interface Bike {
  id: number;
  model: string;
  color: string;
  location: string;
  imageUrl: string;
  isAvailable: boolean;
  pricePerHour: number;
  priceForInterval: string;
  rating: number;
}

export interface BikesResponse extends Pagination {
  bikes: Bike[];
}

export interface Filter {
  label: string;
  items: string[];
}

export enum BookingStatus {
  FUTURE = "FUTURE",
  PRESENT = "PRESENT",
  PAST = "PAST",
}

export interface NewBooking {
  userId: number;
  bikeId: number;
  pickupDate: string;
  pickupLocation: string;
  dropoffDate: string;
  dropoffLocation: string;
}

export interface Booking {
  id: number;
  bikeId: number;
  bike: Bike;
  userId: number;
  user: User;
  rating: { score: number }[];
  price: number;
  currency: string;
  pickupDate: string;
  pickupLocation: string;
  dropoffDate: string;
  dropoffLocation: string;
  completed: boolean;
  createdAt: string;
}

export interface AllBooking {
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  price: number;
  pickupDate: string;
  pickupLocation: string;
  dropoffDate: string;
  dropoffLocation: string;
  completed: boolean;
}
