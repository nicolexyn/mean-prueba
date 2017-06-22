'use strict';

import mongoose from 'mongoose';

var HotelSchema = new mongoose.Schema({

    id: Number,
    description: String,
    name: String,
    geo_position: { latitude: Number, longitude: Number },
    images: [],
    amenities: [],
    stars: Number,
    recommended: Boolean,
    checkin_time: String,
    checkout_time: String,
    hotel_chain: String,
    rating_summary: mongoose.Schema.Types.Mixed,
    rate: mongoose.Schema.Types.Mixed,
    payment_methods: [],
    slug: String,
    defaultPaymentMethod: String
});

export default mongoose.model('Hotel', HotelSchema);
