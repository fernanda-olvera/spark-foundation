function addTask(){
    console.log('hola');

}
$('button.editTask').click(function(){
    var name_field = $(this).closest('.label-wrapper').find('#name-field');
    var name = $(this).closest('.label-wrapper').find('p');
    var text = name.text();
    var accept_btn = $(this).closest('.label-wrapper').find('button.accept');

    name_field.toggleClass('none-display');
    accept_btn.toggleClass('none-display');
    name.toggleClass('none-display');

    name_field.val(text);
    name_field.select();
    $(this).prop('disabled',true)
    // console.log(text)
});

$(document).on('submit', '#post-form',function(e){
    var new_name= $(this).find('#name-field').val();
    var completed = $(this).find('input[type="checkbox"]').prop('checked');
    // window.alert(completed);
    // e.preventDefault();
    var original_name=$(this).find('p').text();
    $.ajax({
        type:'POST',
        url:'/todo_list/edit_task',
        data:{
            original_name: original_name,
            name: new_name,
            completed: completed,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post'
        },
        success:function(json){
           console.log('name: '+json.name+ 'checked: '+json.completed);
        },
        error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
    }
    });
});

