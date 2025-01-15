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
            url: "http://localhost:8080/api/promotions/search",
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
        window.location.href = "promotion-form.html";
    };

    window.editPromotion = function(id) {
        $.ajax({
            url: `http://localhost:8080/api/promotions/${id}`,
            type: "GET",
            success: function(promotion) {

                $.ajax({
                    url: "/path/to/your/editForm.html",
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
                url: `http://localhost:8080/api/promotions/${id}`,
                type: "DELETE",
                success: function() {
                    alert("Xóa khuyến mãi thành công.");
                    loadPromotions();
                }
            });
        }
    };
});

$(document).ready(function() {

    $('#promotionForm').on('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            var promotion = {
                id: $('#promotionId').val(),
                title: $('#title').val(),
                startDate: $('#startDate').val(),
                endDate: $('#endDate').val(),
                discount: $('#discount').val(),
                details: $('#details').val()
            };
            if (promotion.id) {
                $.ajax({
                    url: `/api/promotions/${promotion.id}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(promotion),
                    success: function(response) {
                        alert('Cập nhật khuyến mãi thành công!');
                        loadPromotions(); // Reload lại danh sách
                        $('#promotionFormModal').modal('hide');
                    },
                    error: function() {
                        alert('Lỗi khi cập nhật khuyến mãi!');
                    }
                });
            } else {

                $.ajax({
                    url: '/api/promotions',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(promotion),
                    success: function(response) {
                        alert('Thêm khuyến mãi thành công!');
                        loadPromotions(); // Reload lại danh sách
                        $('#promotionFormModal').modal('hide');
                    },
                    error: function() {
                        alert('Lỗi khi thêm khuyến mãi!');
                    }
                });
            }
        }
    });
});

function validateForm() {
    var valid = true;

    if ($('#title').val() === '') {
        valid = false;
        alert('Tiêu đề không được để trống!');
    }

    var startDate = $('#startDate').val();
    if (startDate === '') {
        valid = false;
        alert('Ngày bắt đầu không được để trống!');
    } else {
        var currentDate = new Date().toISOString().split('T')[0];
        if (startDate <= currentDate) {
            valid = false;
            alert('Ngày bắt đầu phải lớn hơn ngày hiện tại!');
        }
    }
    var endDate = $('#endDate').val();
    if (endDate === '') {
        valid = false;
        alert('Ngày kết thúc không được để trống!');
    } else {
        if (endDate <= startDate) {
            valid = false;
            alert('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày!');
        }
    }
    var discount = $('#discount').val();
    if (discount === '' || discount < 10) {
        valid = false;
        alert('Mức giảm giá phải lớn hơn 10,000 VNĐ!');
    }
    if ($('#details').val() === '') {
        valid = false;
        alert('Chi tiết không được để trống!');
    }
    return valid;
}
$("#promotionForm").submit(function(event) {
    event.preventDefault();
    var promotionData = {
        title: $("#title").val(),
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val(),
        discount: $("#discount").val(),
        details: $("#details").val()
    };


    $.ajax({
        url: "/api/promotions/save",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(promotionData),
        success: function(response) {
            alert('Khuyến mãi đã được lưu thành công!');
            $("#promotionFormModal").modal('hide');
            loadPromotions();
        },
        error: function() {
            alert('Lỗi khi lưu khuyến mãi.');
        }
    });
});

$("#backToHomePageButton").click(function() {
    window.location.href = "promotion.html";
});



