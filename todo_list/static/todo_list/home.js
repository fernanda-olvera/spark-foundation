$(document).ready(function(){
    $('#addTaskForm').dialog({
        autoOpen:false,
        dialogClass: "no-close",
        buttons: [
            {text:"Add", click:function(){ add_task(); } },
            { text:"Cancel", click: function(){$(this).dialog('close');} }
        ]
    });
    function add_task(){
        var name=$('input[name=task-name]').val();
        // console.log(name);
        $.ajax({
            type:'POST',
            url:'/todo_list/add_task',
            data:{
                name: name,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success:function(json){
               console.log('name: '+json.name);
            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
        window.location.reload();
    }
});

$('#addTask').click(function(){ //Add Task Button
    $('#addTaskForm').dialog('open');
});
$('button.editTask').click(function(){ //Edit Task Button
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
$('button.deleteTask').click(function(e){ //Delete Task Button
    var name = $(this).closest('.label-wrapper').find('p').text();
    //e.preventDefault();
    if(confirm('Press OK for deleting task "'+name+'"')){
        console.log('deleted task '+name);
        $.ajax({
            type:'POST',
            url:'/todo_list/delete_task',
            data:{
                name: name,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success:function(json){
               console.log('name: '+json.name);
            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
        window.location.reload();
    }
    // console.log(text);
});
$(document).on('submit', '#post-form',function(e){
    var new_name= $(this).find('#name-field').val();
    var completed = $(this).find('input[type="checkbox"]').prop('checked');
    // window.alert(completed);
    // e.preventDefault();
    var original_name=$(this).find('p').text();
    $.ajax({
        type:'POST',
        url:'/todo_list/',
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
$('input[type="checkbox"]').on('change',function(e){ //Click in checkbox
    var completed=$(this).prop('checked');
    var name= $(this).siblings('p').text();
    e.preventDefault();

    $.ajax({
        type:'POST',
        url:'/todo_list/edit_task',
        data:{
            name: name,
            completed: completed,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post'
        },
        success:function(json){
           console.log('name: '+json.name+ ' checked: '+json.completed);
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
});
