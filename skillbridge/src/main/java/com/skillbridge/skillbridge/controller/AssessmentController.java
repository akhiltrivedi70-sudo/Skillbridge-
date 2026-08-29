package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.*;
import com.skillbridge.skillbridge.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/create")
    public Assessment createAssessment(@RequestBody Assessment assessment) {
        return assessmentService.createAssessment(assessment);
    }

    @PostMapping("/question/add")
    public AssessmentQuestion addQuestion(@RequestBody AssessmentQuestion question) {
        return assessmentService.addQuestion(question);
    }

    @GetMapping("/{assessmentId}/questions")
    public List<AssessmentQuestion> getQuestions(@PathVariable Long assessmentId) {
        return assessmentService.getQuestions(assessmentId);
    }

    @PostMapping("/submit")
    public AssessmentResult submitAssessment(@RequestBody SubmitRequest request) {
        return assessmentService.submitAssessment(request.getUserId(), request.getAssessmentId(), request.getAnswers());
    }

    @GetMapping("/results/{userId}")
    public List<AssessmentResult> getResultsForUser(@PathVariable Long userId) {
        return assessmentService.getResultsForUser(userId);
    }

    public static class SubmitRequest {
        private Long userId;
        private Long assessmentId;
        private Map<Long, String> answers;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getAssessmentId() { return assessmentId; }
        public void setAssessmentId(Long assessmentId) { this.assessmentId = assessmentId; }
        public Map<Long, String> getAnswers() { return answers; }
        public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
    }
}