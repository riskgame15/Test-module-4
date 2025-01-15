package com.codegym.service;

import com.codegym.model.Promotion;

import java.util.List;

public interface IPromotionService {
    List<Promotion> getAllPromotions();
    Promotion getPromotionById(Long id);
    Promotion savePromotion(Promotion promotion);
    void deletePromotion(Long id);
    List<Promotion> searchPromotions(String keyword);
}
