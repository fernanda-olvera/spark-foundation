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
        var csrf=$('input[name=csrfmiddlewaretoken]').val();
        // console.log(name);
        $.post('/todo_list/add_task', { name: name, csrfmiddlewaretoken: csrf, action: 'post'});
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
    var csrf=$('input[name=csrfmiddlewaretoken]').val();
    //e.preventDefault();
    if(confirm('Press OK for deleting task "'+name+'"')){
        console.log('deleted task '+name);
        $.post('/todo_list/delete_task', {name: name, csrfmiddlewaretoken: csrf, action: 'post'});
        window.location.reload();
    }
    // console.log(text);
});
$(document).on('submit', '#post-form',function(e){
    var new_name= $(this).find('#name-field').val();
    var completed = $(this).find('input[type="checkbox"]').prop('checked');
    var csrf=$('input[name=csrfmiddlewaretoken]').val();
    // window.alert(completed);
    // e.preventDefault();
    var original_name=$(this).find('p').text();
    $.post('/todo_list/', { original_name: original_name, name: new_name, completed: completed, csrfmiddlewaretoken:csrf, action: 'post'});
});
$('input[type="checkbox"]').on('change',function(e){ //Click in checkbox
    var completed=$(this).prop('checked');
    var name= $(this).siblings('p').text();
    var csrf=$('input[name=csrfmiddlewaretoken]').val();
    e.preventDefault();

    $.post('/todo_list/edit_task', { name: name, completed: completed, csrfmiddlewaretoken: csrf, action: 'post'});
});
