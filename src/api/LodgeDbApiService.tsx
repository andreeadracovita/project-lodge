import { apiClient } from "./ApiClient";

// User
export const createAccount
	= (payload) => apiClient.post("/auth/signup", payload);

export const getUserConfig
	= () => apiClient.get("/user/config");

export const updateUserName
	= (payload) => apiClient.patch("/user/name", payload);

export const updateUserEmail
	= (payload) => apiClient.patch("/user/email", payload);

export const updateUserNationality
	= (payload) => apiClient.patch("/user/nationality", payload);

export const updateUserPassword
	= (payload) => apiClient.patch("/user/password", payload);

export const updateUserExperiences
	= (payload) => apiClient.patch("/user/experiences", payload);

export const deleteAccount
	= (userId) => apiClient.delete(`/user/${userId}`);

export const getPropertiesByUserId
	= () => apiClient.get(`/user/properties`);

// Property
// Testing purposes: there will never be a case when we need to fetch all properties without a filter
export const getAllProperties
	= () => apiClient.get("/property/all");

export const getPropertyById
	= (id) => apiClient.get(`/property/id/${id}`);

// Filters: country, city, proximity, price, rental type, experiences, property type
export const getPropertiesFilteredBy
	= (payload) => apiClient.post(`/property/filter`, payload);

// Types
export const getAllFeatures
	= () => apiClient.get("/types/feature");

export const getAllRentalTypes
	= () => apiClient.get("/types/rental");

export const getAllBuildingTypes
	= () => apiClient.get("/types/building");

export const getAllExperiences
	= () => apiClient.get("/types/experience");

// Bookings
export const getBookingById
	= (id) => apiClient.get(`/booking/id/${id}`);

export const getBookingsByUserId
	= (userId) => apiClient.get(`/booking/user-id/${userId}`);

export const getBookingsByPropertyId
	= (propertyId) => apiClient.get(`/booking/property-id/${propertyId}`);

export const createBooking
	= (payload) => apiClient.post("/booking/new", payload);

// Availability
export const getPropertyBookedRanges
	= (payload) => apiClient.post("/property/booked-ranges", payload);

// Wishlist
export const getWishlistByUserId
	= (userId) => apiClient.get(`/wishlist/user-id/${userId}`);

// Messages
export const getMessagesSentByUserIdToPropertyId
	= (userId, propertyId) => apiClient.get(`/message/user/${userId}/${propertyId}`);

export const getMessagesSentByPropertyIdToUserId
	= (userId, propertyId) => apiClient.get(`/message/property/${propertyId}/${userId}`);

// Reviews
export const getAllReviewsByPropertyId
	= (propertyId) => apiClient.get(`/review/property-id/${propertyId}`);

export const getAllReviewsByUserId
	= (userId) => apiClient.get(`/reviews/user-id/${userId}`);
