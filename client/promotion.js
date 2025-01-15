$(document).ready(function() {
    loadPromotions();
});

function loadPromotions() {
    $.ajax({
        url: "/api/promotions",
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
                            <button onclick="editPromotion(${promotion.id})">Sửa</button>
                            <button onclick="deletePromotion(${promotion.id})">Xóa</button>
                        </td>
                    </tr>
                `;
            });
            $("#promotionTableBody").html(rows);
        }
    });
}


function showAddForm() {
    $("#formTitle").text("Thêm khuyến mãi");
    $("#promotionId").val('');
    $("#title").val('');
    $("#startDate").val('');
    $("#endDate").val('');
    $("#discount").val('');
    $("#details").val('');
    $("#promotionForm").show();
}

function hideForm() {
    $("#promotionForm").hide();
}

function savePromotion() {
    let id = $("#promotionId").val();
    let promotion = {
        title: $("#title").val(),
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val(),
        discount: $("#discount").val(),
        details: $("#details").val()
    };

    let url = "/api/promotions";
    let method = "POST";
    if (id) {
        url += `/${id}`;
        method = "PUT";
    }

    $.ajax({
        url: url,
        type: method,
        contentType: "application/json",
        data: JSON.stringify(promotion),
        success: function() {
            loadPromotions();
            hideForm();
        }
    });
}

function editPromotion(id) {
    $.ajax({
        url: `/api/promotions/${id}`,
        type: "GET",
        success: function(promotion) {
            $("#formTitle").text("Chỉnh sửa khuyến mãi");
            $("#promotionId").val(promotion.id);
            $("#title").val(promotion.title);
            $("#startDate").val(promotion.startDate);
            $("#endDate").val(promotion.endDate);
            $("#discount").val(promotion.discount);
            $("#details").val(promotion.details);
            $("#promotionForm").show();
        }
    });
}

function deletePromotion(id) {
    if (confirm("Bạn có chắc muốn xoá khuyến mãi này không?")) {
        $.ajax({
            url: `/api/promotions/${id}`,
            type: "DELETE",
            success: function() {
                loadPromotions();
            }
        });
    }
}

function searchPromotion() {
    let keyword = $("#searchInput").val();
    $.ajax({
        url: `/api/promotions/search?keyword=${keyword}`,
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
                            <button onclick="editPromotion(${promotion.id})">Sửa</button>
                            <button onclick="deletePromotion(${promotion.id})">Xóa</button>
                        </td>
                    </tr>
                `;
            });
            $("#promotionTableBody").html(rows);
        }
    });
}



