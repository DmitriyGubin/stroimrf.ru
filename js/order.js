// $(document).ready(function(){

	$("#for_send").on("click",function(){

        var err=0;
        
        var arr = ['#pop-up-name',
        '#pop-up-phone'
        ];

        err = Validate(arr,'pop-up-phone');

        if (err == 0)
        {
            $.ajax({
                type: "POST",
                url: 'send-order.php',
                data: {
                'name': $("#pop-up-name").val(),
                'phone': $("#pop-up-phone").val(),
                'house_name': $("#house-name").val(),
                'house_price': $("#house-price").val(),
                'bank_name': $("#bank-name").val()
            },
            dataType: "json",
            success: function(data){

                if (data.status == true)
                {
                    $("#pop-up-name").val('');
                    $("#pop-up-phone").val('');
                    $("#house-name").val('');
                    $("#house-price").val('');
                    $("#bank-name").val('');

                    $("#form-content").addClass("hide");
                    $("#succes_order").addClass("show");
                }
            }
        });
        }

    });
// });


function Validate(arr,phone_id)
{
    var err=0;

    for (let item of arr)
    {
     var bool;

     if($(item).attr("id") == phone_id)
     {
        bool = (($(item).val()).length != 16);
    }
    else 
    {
        bool = ($(item).val() == '');
    }

    if (bool)
    {
        err++;
        $(item).addClass("hasError");
    } 
    else 
    {
        $(item).removeClass("hasError");
    }
}

return err;
}