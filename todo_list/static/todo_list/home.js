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
        $.post('/todo_list/', { name: name, csrfmiddlewaretoken: csrf, action: 'addTask'});
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
        $.post('/todo_list/', {name: name, csrfmiddlewaretoken: csrf, action: 'deleteTask'});
        window.location.reload();
    }
    // console.log(text);
});
$(document).on('submit', '#post-form',function(e){ // Edit Task Name
    var new_name= $(this).find('#name-field').val();
    var csrf=$('input[name=csrfmiddlewaretoken]').val();
    // window.alert(completed);
    // e.preventDefault();
    var original_name=$(this).find('p').text();
    $.post('/todo_list/', { name: original_name, new_name: new_name, csrfmiddlewaretoken:csrf, action: 'editN'});
});
$('input[type="checkbox"]').on('change',function(e){ // Edit Task Completed Status
    var completed=$(this).prop('checked');
    var name= $(this).siblings('p').text();
    var csrf=$('input[name=csrfmiddlewaretoken]').val();
    e.preventDefault();

    $.post('/todo_list/', { name: name, completed: completed, csrfmiddlewaretoken: csrf, action: 'editC'});
});
