jQuery(function($){
$(document).ready(function(){

    // Case Symptoms -> combined ICD9(R)/bika_symptoms lookup
    function lookups(){
        $(".template-symptoms #Title").combogrid({
            colModel: [{'columnName':'Code', 'width':'10', 'label':window.jsi18n_bika('Code')},
                       {'columnName':'Title', 'width':'25', 'label':window.jsi18n_bika('Title')},
                       {'columnName':'Description', 'width':'65', 'label':window.jsi18n_bika('Description')}],
            url: window.portal_url + "/getSymptoms?_authenticator=" + $('input[name="_authenticator"]').val(),
            select: function( event, ui ) {
                event.preventDefault();
                $(this).val(ui.item.Title);
                $(this).parents('tr').find('input[id=Code]').val(ui.item.Code);
                $(this).parents('tr').find('input[id=Description]').val(ui.item.Description);
                $(this).change();
                return false;
            }
        });
    }
    lookups();

    $(".template-symptoms .add_row").click(function(event){
        event.preventDefault();
        C = $("#Code").val();
        T = $("#Title").val();
        D = $("#Description").val();
        O = $("#Onset").val();
        if (T == ''){
            return false;
        }
        newrow = $("tr#new").clone();
        $("tr#new").removeAttr('id');
        $("#Code").parent().append("<span>"+C+"</span>");
        $("#Code").parent().append("<input type='hidden' name='CSY_Code:list' value='"+C+"'/>");
        $("#Code").remove();
        $("#Title").parent().append("<span>"+T+"</span>");
        $("#Title").parent().append("<input type='hidden' name='CSY_Title:list' value='"+T+"'/>");
        $("#Title").remove();
        $("#Description").parent().append("<span>"+D+"</span>");
        $("#Description").parent().append("<input type='hidden' name='CSY_Description:list' value='"+D+"'/>");
        $("#Description").remove();
        $("#Onset").parent().append("<span>"+O+"</span>");
        $("#Onset").parent().append("<input type='hidden' name='CSY_Onset:list' value='"+O+"'/>");
        $("#Onset").remove();
        for(i=0; i<$(newrow).children().length; i++){
            td = $(newrow).children()[i];
            input = $(td).children()[0];
            $(input).val('');
        }
        $(newrow).appendTo($(".bika-listing-table"));
        lookups();
        return false;
    })

});
});
