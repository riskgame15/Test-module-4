$(document).ready(function() {
    loadPromotions();

    function loadPromotions() {
        $.ajax({
            url: "http://localhost:8080/api/promotions",
            type: "GET",
            success: function(data) {
                let rows = '';
                data.forEach(promotion => {
                    rows += `
                        <tr>
                            <td>${promotion.title}</td>
                            <td>${promotion.startDate.replace('T', ' ')}</td>
                            <td>${promotion.endDate.replace('T', ' ')}</td>
                            <td>${promotion.discount}%</td>
                            <td>${promotion.details}</td>
                            <td>
                                <button class="btn btn-warning" onclick="editPromotion(${promotion.id})">Sửa</button>
                            </td>
                            <td>
                                <button class="btn btn-danger" onclick="deletePromotion(${promotion.id})">Xóa</button>
                            </td>
                        </tr>
                    `;
                });
                $("#promotionTableBody").html(rows);
            }
        });
    }

    window.searchPromotion = function() {
        const keyword = $("#searchKeyword").val();
        $.ajax({
            url: "/api/promotions/search",
            type: "GET",
            data: { keyword: keyword },
            success: function(data) {
                let rows = '';
                data.forEach(promotion => {
                    rows += `
                        <tr>
                            <td>${promotion.title}</td>
                            <td>${promotion.startDate.replace('T', ' ')}</td>
                            <td>${promotion.endDate.replace('T', ' ')}</td>
                            <td>${promotion.discount}%</td>
                            <td>${promotion.details}</td>
                            <td>
                                <button class="btn btn-warning" onclick="editPromotion(${promotion.id})">Sửa</button>
                            </td>
                            <td>
                                <button class="btn btn-danger" onclick="deletePromotion(${promotion.id})">Xóa</button>
                            </td>
                        </tr>
                    `;
                });
                $("#promotionTableBody").html(rows);
            }
        });
    };


    window.showAddForm = function() {
        $.ajax({
            url: "/path/to/your/addForm.html",  // Cập nhật đường dẫn chính xác đến form
            type: "GET",
            success: function(response) {
                $("#promotionFormContainer").html(response);
                $("#promotionFormModal").modal('show');
            }
        });
    };


    window.editPromotion = function(id) {
        $.ajax({
            url: `/api/promotions/${id}`,
            type: "GET",
            success: function(promotion) {
                // Chèn dữ liệu vào form sửa
                $.ajax({
                    url: "/path/to/your/editForm.html", // Cập nhật đường dẫn chính xác đến form sửa
                    type: "GET",
                    success: function(response) {
                        $("#promotionFormContainer").html(response);
                        $("#promotionTitle").val(promotion.title);
                        $("#promotionStartDate").val(promotion.startDate);
                        $("#promotionEndDate").val(promotion.endDate);
                        $("#promotionDiscount").val(promotion.discount);
                        $("#promotionDetails").val(promotion.details);
                        $("#promotionId").val(promotion.id);
                        $("#promotionFormModal").modal('show');
                    }
                });
            }
        });
    };


    window.deletePromotion = function(id) {
        if (confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
            $.ajax({
                url: `/api/promotions/${id}`,
                type: "DELETE",
                success: function() {
                    alert("Xóa khuyến mãi thành công.");
                    loadPromotions();
                }
            });
        }
    };
});
