import React from 'react'
import axios from 'axios';

export const axiosConnection = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json"
    }
});


