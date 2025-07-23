import { apiClient } from "./ApiClient";

// Misc
export const getExchangeRateForTarget
	= (target) => apiClient(`/misc/exchange-rate?target=${target}`);

export const getUserNameAndAvatar
	= (id) => apiClient(`/misc/user/${id}`);

/**
 * Fetch an array of objects representing locations associated with the given address.
 * @param address - string uniting address with +, example: Zurich+Rotwandstrasse+38+Switzerland
 */
export const getGeolocation
	= (address) => apiClient(`/misc/geo/${address}`);

// User -----------------------------------------------------------------------
export const getUserConfig
	= () => apiClient.get("/user/config");

export const getIsPropertyWishlisted
	= (propertyId) => apiClient.get(`/user/wishlist/property-id/${propertyId}`);

export const toggleWishlistProperty
	= (propertyId) => apiClient.post(`/user/wishlist/toggle/property-id/${propertyId}`);

export const getAllWishlisted
	= () => apiClient.get("/user/wishlist/all");

export const getAllBookings
	= () => apiClient.get("/user/booking/all");

export const updateUser
	= (payload) => apiClient.patch("/user", payload);

export const updateUserPassword
	= (payload) => apiClient.patch("/user/password", payload);

export const deleteAccount
	= () => apiClient.delete("/user");

export const checkViewBookingAuthorization
	= (bookingId) => apiClient.get(`/user/authorize/booking?id=${bookingId}`);

// Photo upload
export const uploadAvatar
	= (payload) => apiClient.post("/upload/avatar", payload);

export const uploadPhotos
	= (payload) => apiClient.post("/upload/photos", payload);

// Property -------------------------------------------------------------------
export const getPropertiesForHome
	= () => apiClient.get("/property/home");

export const getPropertiesForQuery
	= (payload) => apiClient.post("/property/query", payload);

export const getPropertyById
	= (id) => apiClient.get(`/property/id/${id}`);

// Date format: 2025-08-01
export const getBookedByPropertyIdForDate
	= (id, date) => apiClient.get(`/property/booked?id=${id}&date=${date}`);

// Date format: 2025-08-01
export const getPropertyAvailability
	= (id, checkIn, checkOut) => apiClient.get(`/property/availability?id=${id}&check_in=${checkIn}&check_out=${checkOut}`);

// Host -----------------------------------------------------------------------
// Protected routes
export const getPropertiesByUserId
	= () => apiClient.get("/host/properties");

export const createNewProperty
	= (payload) => apiClient.post("/host/property/new", payload);

export const updateProperty
	= (id, payload) => apiClient.patch(`/host/property/${id}`, payload);

export const deletePropertyById
	= (id) => apiClient.delete(`/host/property/${id}`);

export const getPartitionedBookings
	= () => apiClient.get("/host/bookings/partitioned");

export const getCalendarBookingsForPropertyId
	= (id) => apiClient.get(`/host/bookings/calendar/property/${id}`);

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
	= (id, pin) => apiClient.get(`/booking?id=${id}&pin=${pin}`);

export const getBookingsByEmail
	= (email) => apiClient.get(`/booking/user-id/${email}`);

export const getBookingsByPropertyId
	= (propertyId) => apiClient.get(`/booking/property-id/${propertyId}`);

export const createBooking
	= (payload) => apiClient.post("/booking/new", payload);

export const authorizeBookingAccess
	= (payload) => apiClient.post("/booking/authorize", payload);

export const cancelBooking
	= (payload) => apiClient.post("/booking/cancel", payload);

// Availability ---------------------------------------------------------------
export const getPropertyBookedRanges
	= (payload) => apiClient.post("/property/booked-ranges", payload);

// Wishlist -------------------------------------------------------------------
export const getWishlistByUserId
	= (userId) => apiClient.get(`/wishlist/user-id/${userId}`);

// Reviews --------------------------------------------------------------------
// Auth
export const existsReviewForBookingId
	= (bookingId) => apiClient.get(`/review/exists/booking/${bookingId}`);

export const getAllReviewsByLoggedUser
	= () => apiClient.get("/review/all");

export const getAuthorizationForReview
	= (propertyId) => apiClient.get(`/review/authorize/booking/${propertyId}`);

export const getAuthorizationForReviewEdit
	= (reviewId) => apiClient.get(`/review/authorize/edit/${reviewId}`);

export const addReviewForBookingId
	= (bookingId, payload) => apiClient.post(`/review/booking/${bookingId}`, payload); 

export const updateReviewById
	= (reviewId, payload) => apiClient.patch(`/review/${reviewId}`, payload);

export const deleteReviewById
	= (reviewId) => apiClient.delete(`/review/${reviewId}`);

// Non-auth
export const getAllReviewsByPropertyId
	= (propertyId) => apiClient.get(`/property/reviews/${propertyId}`);
