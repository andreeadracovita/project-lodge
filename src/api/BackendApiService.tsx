import { apiClient } from "./ApiClient";

// Misc
export const getConvertedPrice
	= (currency, value) => apiClient(`/misc/convert?currency=${currency}&value=${value}`);

// User
export const getUserConfig
	= () => apiClient.get("/user/config");

export const getIsPropertyWishlisted
	= (propertyId) => apiClient.get(`/user/wishlist/property-id/${propertyId}`);

export const toggleWishlistProperty
	= (propertyId) => apiClient.post(`/user/wishlist/toggle/property-id/${propertyId}`);

export const getAllWishlisted
	= () => apiClient.get("/user/wishlist/all");

export const updateUser
	= (payload) => apiClient.patch("/user", payload);

export const deleteAccount
	= () => apiClient.delete("/user");

// Photo upload
export const uploadAvatar
	= (payload) => apiClient.post("/upload/avatar", payload);

export const uploadPhotos
	= (payload) => apiClient.post("/upload/photos", payload);

// Property
// Testing purposes: there will never be a case when we need to fetch all properties without a filter
export const getAllProperties
	= () => apiClient.get("/property/all");

export const getPropertyById
	= (id) => apiClient.get(`/property/id/${id}`);

// Filters: country, city, proximity, price, rental type, experiences, property type
export const getPropertiesFilteredBy
	= (payload) => apiClient.post(`/property/filter`, payload);

// Host
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

export const getBookingsByEmail
	= (email) => apiClient.get(`/booking/user-id/${email}`);

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
