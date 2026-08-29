package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.Review;
import com.skillbridge.skillbridge.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/user/{userId}")
    public List<Review> getReviewsForUser(@PathVariable Long userId) {
        return reviewService.getReviewsForUser(userId);
    }

    @GetMapping("/user/{userId}/average")
    public double getAverageRating(@PathVariable Long userId) {
        return reviewService.getAverageRating(userId);
    }
}