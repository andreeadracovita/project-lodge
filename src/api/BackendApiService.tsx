import { apiClient } from "./ApiClient";

// Misc
export const getExchangeRateForTarget
	= (target) => apiClient(`/misc/exchange-rate?target=${target}`);

export const getUserNameAndAvatar
	= (id) => apiClient(`/misc/user/${id}`);

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
// Testing purposes: there will never be a case when we need to fetch all properties without a filter
export const getAllProperties
	= () => apiClient.get("/property/all");

export const getPropertyById
	= (id) => apiClient.get(`/property/id/${id}`);

// Date format: 2025-08-01
export const getBookedByPropertyIdForDate
	= (id, date) => apiClient.get(`/property/booked?id=${id}&date=${date}`);

// Date format: 2025-08-01
export const getPropertyAvailability
	= (id, checkIn, checkOut) => apiClient.get(`/property/availability?id=${id}&check_in=${checkIn}&check_out=${checkOut}`);

// Filters: country, city, proximity, price, rental type, experiences, property type
export const getPropertiesFilteredBy
	= (payload) => apiClient.post(`/property/filter`, payload);

// Host -----------------------------------------------------------------------
// Protected routes
export const getPropertiesByUserId
	= () => apiClient.get("/host/properties");

export const createNewProperty
	= (payload) => apiClient.post("/host/properties/new", payload);

export const updateProperty
	= (id, payload) => apiClient.patch(`/host/property/${id}`, payload);

export const createNewPropertyDetailBase
	= (payload) => apiClient.post("/host/property-details/new/base", payload);

export const updatePropertyDetails
	= (id, payload) => apiClient.patch(`/host/property-details/${id}`, payload);

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

// Rename: getAllPropertyTypes
export const getAllBuildingTypes
	= () => apiClient.get("/types/building");

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

// Messages -------------------------------------------------------------------
export const getMessagesForUser1User2PropertyId
	= (userId1, userId2, propertyId) => apiClient.get(`/message/${userId1}/${userId2}/${propertyId}`);

// Reviews --------------------------------------------------------------------
// Auth
export const existsReviewForBookingId
	= (bookingId) => apiClient.get(`/review/exists/booking/${bookingId}`);

export const addReviewForBookingId
	= (bookingId, payload) => apiClient.post(`/review/booking/${bookingId}`, payload); 

export const getAllReviewsByLoggedUser
	= () => apiClient.get("/review/all");

export const getAuthorizationForReview
	= (propertyId) => apiClient.get(`/review/authorize/booking/${propertyId}`);

// Non-auth
export const getAllReviewsByPropertyId
	= (propertyId) => apiClient.get(`/property/reviews/${propertyId}`);
