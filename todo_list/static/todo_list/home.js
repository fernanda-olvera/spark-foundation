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

$('button.accept').click(function(){
    var name_field=$(this).siblings('#name-field');
    var name = $(this).siblings('p');
    var text = name_field.val();
    var edit_btn = $(this).closest('.label-wrapper').find('.editTask');

    name_field.toggleClass('none-display');
    $(this).toggleClass('none-display');
    name.toggleClass('none-display');

    name.text(text)
    edit_btn.prop('disabled',false)

    console.log(text);
});