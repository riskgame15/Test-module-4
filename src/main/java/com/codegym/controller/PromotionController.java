package com.codegym.controller;

import com.codegym.model.Promotion;
import com.codegym.service.IPromotionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/promotions")
public class PromotionController {

    private final IPromotionService promotionService;

    public PromotionController(IPromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping("")
    public List<Promotion> getAllPromotions() {
        return promotionService.getAllPromotions();
    }

    @PostMapping("")
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) {
        return ResponseEntity.ok(promotionService.savePromotion(promotion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promotion> updatePromotion(@PathVariable Long id, @RequestBody Promotion promotion) {
        Promotion existing = promotionService.getPromotionById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        promotion.setId(id);
        return ResponseEntity.ok(promotionService.savePromotion(promotion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Promotion> searchPromotions(@RequestParam String keyword) {
        return promotionService.searchPromotions(keyword);
    }
}
