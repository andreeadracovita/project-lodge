import { apiClient } from "./ApiClient";

// Misc
export const getExchangeRateForTarget
	= (target: string) => apiClient(`/misc/exchange-rate?target=${target}`);

export const getUserNameAndAvatar
	= (id: number) => apiClient(`/misc/user/${id}`);

/**
 * Fetch an array of objects representing locations associated with the given address.
 * @param address - string uniting address with +, example: Zurich+Rotwandstrasse+38+Switzerland
 */
export const getGeolocation
	= (address: string) => apiClient(`/misc/geo/${address}`);

// User -----------------------------------------------------------------------
export const getUserConfig
	= () => apiClient.get("/user/config");

export const getIsPropertyWishlisted
	= (propertyId: number) => apiClient.get(`/user/wishlist/property-id/${propertyId}`);

export const toggleWishlistProperty
	= (propertyId: number) => apiClient.post(`/user/wishlist/toggle/property-id/${propertyId}`);

export const getAllWishlisted
	= () => apiClient.get("/user/wishlist/all");

export const getAllBookings
	= () => apiClient.get("/user/booking/all");

export const updateUser
	= (payload: any) => apiClient.patch("/user", payload);

export const updateUserPassword
	= (payload: any) => apiClient.patch("/user/password", payload);

export const deleteAccount
	= () => apiClient.delete("/user");

export const checkViewBookingAuthorization
	= (bookingId: number) => apiClient.get(`/user/authorize/booking?id=${bookingId}`);

// Photo upload
export const uploadAvatar
	= (payload: any) => apiClient.post("/upload/avatar", payload);

export const uploadPhotos
	= (payload: any) => apiClient.post("/upload/photos", payload);

// Property -------------------------------------------------------------------
export const getPropertiesForHome
	= () => apiClient.get("/property/home");

export const getPropertiesForQuery
	= (payload: any) => apiClient.post("/property/query", payload);

export const getPropertyById
	= (id: number) => apiClient.get(`/property/id/${id}`);

// Date format: 2025-08-01
export const getBookedByPropertyIdForDate
	= (id: number, date: string) => apiClient.get(`/property/booked?id=${id}&date=${date}`);

// Date format: 2025-08-01
export const getPropertyAvailability
	= (id: number, checkIn: string, checkOut: string) => apiClient.get(`/property/availability?id=${id}&check_in=${checkIn}&check_out=${checkOut}`);

// Host -----------------------------------------------------------------------
// Protected routes
export const getPropertiesByUserId
	= () => apiClient.get("/host/properties");

export const createNewProperty
	= (payload: any) => apiClient.post("/host/property/new", payload);

export const updateProperty
	= (id: number, payload: any) => apiClient.patch(`/host/property/${id}`, payload);

export const deletePropertyById
	= (id: number) => apiClient.delete(`/host/property/${id}`);

export const getPartitionedBookings
	= () => apiClient.get("/host/bookings/partitioned");

export const getCalendarBookingsForPropertyId
	= (id: number) => apiClient.get(`/host/bookings/calendar/property/${id}`);

// Types ----------------------------------------------------------------------
export const getAllFeatures
	= () => apiClient.get("/types/feature");

export const getAllRentalTypes
	= () => apiClient.get("/types/rental");

export const getAllPropertyTypes
	= () => apiClient.get("/types/property");

export const getAllExperiences
	= () => apiClient.get("/types/experience");

// Bookings -------------------------------------------------------------------
export const getBookingById
	= (id: number, pin: string) => apiClient.get(`/booking?id=${id}&pin=${pin}`);

export const getBookingsByEmail
	= (email: string) => apiClient.get(`/booking/user-id/${email}`);

export const getBookingsByPropertyId
	= (propertyId: number) => apiClient.get(`/booking/property-id/${propertyId}`);

export const createBooking
	= (payload: any) => apiClient.post("/booking/new", payload);

export const authorizeBookingAccess
	= (payload: any) => apiClient.post("/booking/authorize", payload);

export const cancelBooking
	= (payload: any) => apiClient.post("/booking/cancel", payload);

// Availability ---------------------------------------------------------------
export const getPropertyBookedRanges
	= (payload: any) => apiClient.post("/property/booked-ranges", payload);

// Wishlist -------------------------------------------------------------------
export const getWishlistByUserId
	= (userId: number) => apiClient.get(`/wishlist/user-id/${userId}`);

// Reviews --------------------------------------------------------------------
// Auth
export const existsReviewForBookingId
	= (bookingId: number) => apiClient.get(`/review/exists/booking/${bookingId}`);

export const getAllReviewsByLoggedUser
	= () => apiClient.get("/review/all");

export const getAuthorizationForReview
	= (propertyId: number) => apiClient.get(`/review/authorize/booking/${propertyId}`);

export const addReviewForBookingId
	= (bookingId: number, payload: any) => apiClient.post(`/review/booking/${bookingId}`, payload); 

export const deleteReviewById
	= (reviewId: number) => apiClient.delete(`/review/${reviewId}`);

// Non-auth
export const getAllReviewsByPropertyId
	= (propertyId: number) => apiClient.get(`/property/reviews/${propertyId}`);
