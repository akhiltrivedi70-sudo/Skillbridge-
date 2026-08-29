package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.model.*;
import com.skillbridge.skillbridge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AssessmentQuestionRepository questionRepository;

    @Autowired
    private AssessmentResultRepository resultRepository;

    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public AssessmentQuestion addQuestion(AssessmentQuestion question) {
        return questionRepository.save(question);
    }

    public List<AssessmentQuestion> getQuestions(Long assessmentId) {
        return questionRepository.findByAssessmentId(assessmentId);
    }

    public AssessmentResult submitAssessment(Long userId, Long assessmentId, Map<Long, String> answers) {
        List<AssessmentQuestion> questions = questionRepository.findByAssessmentId(assessmentId);

        int correctCount = 0;
        for (AssessmentQuestion q : questions) {
            String submitted = answers.get(q.getId());
            if (submitted != null && submitted.equalsIgnoreCase(q.getCorrectAnswer())) {
                correctCount++;
            }
        }

        double score = questions.isEmpty() ? 0 : (correctCount * 100.0) / questions.size();

        User user = new User();
        user.setId(userId);

        Assessment assessment = new Assessment();
        assessment.setId(assessmentId);

        AssessmentResult result = new AssessmentResult();
        result.setUser(user);
        result.setAssessment(assessment);
        result.setScore(score);

        return resultRepository.save(result);
    }

    public List<AssessmentResult> getResultsForUser(Long userId) {
        return resultRepository.findByUserId(userId);
    }
}