jQuery(document).ready(function(e){"use strict";function t(){e(".mf-btn-del-singl-field").click(function(){e(this).parent(".mf-cf-single-field").remove()})}function i(e,t="",i=""){return'<div id="mf-cf-single-field" class="mf-cf-single-field"">\n                <div style="width:50%;display:inline-block;">\n                <label>Name</label>\n                <input type="text" name="mf_post_submission_custom_fields_name[]" class="attr-form-control" value="'+t+'">\n                </div>\n                <div style="width:50%;display:inline-block;">\n                <label>Select Field</label><br>\n                <select data-selected="'+i+'" name="mf_post_submission_mf_field_name[]" class="attr-form-control">'+e+'</select>\n                </div>\n                <a href="#" class="mf-btn-del-singl-field" style="color:red">Delete</a>\n                </div>'}e(".metfrom-btn-refresh-get-response-list").click(function(){var t=e(this);t.addClass("mf-setting-spin");var i,s=e("#metform_form_modal"),o=e("#metform-form-modalinput-settings").attr("data-nonce"),a=e(".get-response-campaign-list");i=s.find("form").attr("data-mf-id"),e.ajax({url:window.metform_api.resturl+"metform/v1/entries/store_get_response_list/"+i,type:"get",headers:{"X-WP-Nonce":o},dataType:"json",success:function(e){a.empty(),e.forEach(e=>{a.append('<option value="'+e.campaignId+'">'+e.description+"</option>")}),t.removeClass("mf-setting-spin")},error:function(e){t.removeClass("mf-setting-spin")}})}),e(".metfrom-btn-refresh-mailchimp-list").click(function(){var t=e(this);t.addClass("mf-setting-spin");var i,s=e("#metform_form_modal"),o=e("#metform-form-modalinput-settings").attr("data-nonce"),a=e(".mailchimp_list");i=s.find("form").attr("data-mf-id"),e.ajax({url:window.metform_api.resturl+"metform/v1/entries/store_mailchimp_list/"+i,type:"get",headers:{"X-WP-Nonce":o},dataType:"json",success:function(e){try{a.empty(),e.lists.forEach(e=>{a.append("<option value="+e.id+">"+e.name+"</option>")})}catch(e){}t.removeClass("mf-setting-spin")},error:function(e){t.removeClass("mf-setting-spin")}})}),e(".metfrom-btn-refresh-hubsopt-list").click(function(){var t=e(this);t.addClass("mf-setting-spin");var i,s=e("#metform_form_modal"),o=e("#metform-form-modalinput-settings").attr("data-nonce"),a=e(".hubspot_forms");i=s.find("form").attr("data-mf-id"),e.ajax({url:window.metform_api.resturl+"metform/v1/forms/hubspot_forms/"+i,type:"get",headers:{"X-WP-Nonce":o},dataType:"json",success:function(e){try{a.empty(),a.append('<option value="select">Select a form</option>'),e.forEach(e=>{a.append("<option value="+e.portalId+" guid="+e.guid+">"+e.name+"</option>")})}catch(e){}t.removeClass("mf-setting-spin")},error:function(e){t.removeClass("mf-setting-spin")}})}),e(".hubspot_forms").on("change",function(){var t=e("option:selected",this).attr("guid"),i=e("option:selected",this).val();e(".mf_hubspot_form_guid").val(t),e(".mf_hubspot_form_portalId").val(i);var s,o=e("#metform_form_modal"),a=e("#metform-form-modalinput-settings").attr("data-nonce");s=o.find("form").attr("data-mf-id"),e("#mf-hubsopt-fileds").html("Please wait....");var r="";e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_fields_data/"+s,type:"get",headers:{"X-WP-Nonce":a},dataType:"json",success:function(i){r=i,e.ajax({url:window.metform_api.resturl+"metform/v1/forms/hubspot_form_fields/"+s,type:"post",headers:{"X-WP-Nonce":a},dataType:"json",data:{guid:t},success:function(t){var i="",s="";Object.keys(r).map(function(e){return[r[e]]}).map(e=>{s+="<option value="+e[0].mf_input_name+">"+e[0].mf_input_label+"</option>"});t.forEach(e=>{i+="<tr><td>"+e.label+"</td><td><select name=mf_hubspot_form_field_name_"+e.name+' class="attr-form-control">'+s+"</select></td></tr>"}),e("#mf-hubsopt-fileds").html('<table width="100%">'+i+"</table>")},error:function(t){e("#mf-hubsopt-fileds").html("Sorry ! Something went wrong")}})},error:function(t){e("#mf-hubsopt-fileds").html("Sorry ! Something went wrong")}})}),e(".row-actions .edit a, .page-title-action, .metform-form-edit-btn, body.post-type-metform-form a.row-title").on("click",function(s){s.preventDefault();var o=0,a=e("#metform_form_modal"),r=e(this).parents(".column-title"),n=e("body").attr("data-metform-template-key");if(a.addClass("loading"),a.modal("show"),r.length>0){o=e(this).attr("data-metform-form-id"),"undefined"!==n&&(o=n),o=void 0!==o?o:r.find(".hidden").attr("id").split("_")[1];var m=e("#metform-form-modalinput-settings").attr("data-nonce");e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(e){v(e),a.removeClass("loading")}})}else{v({form_title:e(".mf-form-modalinput-title").attr("data-default-value"),admin_email_body:"",admin_email_from:"",admin_email_reply_to:"",admin_email_subject:"",capture_user_browser_data:"",enable_admin_notification:"",limit_total_entries_status:"",limit_total_entries:"0",redirect_to:"",success_url:"",failed_cancel_url:"",require_login:"",store_entries:"1",entry_title:"",success_message:e(".mf-form-modalinput-success_message").attr("data-default-value"),user_email_body:"",user_email_from:"",user_email_reply_to:"",user_email_subject:"",input_names:"Example: [mf-inputname]"}),a.removeClass("loading")}e(".mf-register").length&&e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_fields_data/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(t){var i=t,s="";e.ajax({url:window.metform_api.resturl+"xs/register/settings/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(t){Object.keys(i).map(function(e){return[i[e]]}).map(e=>{s+="<option value="+e[0].mf_input_name+">"+e[0].mf_input_label+"</option>"});var o='<div class="mf-input-group mf-input-group-inline">'+('<label class="attr-input-label">User Name</label><div class="mf-inputs"><select class="attr-form-control" id="mf_auth_reg_user_name" name="mf_auth_reg_user_name">'+s+"</select></div>")+'</div><div class="mf-input-group mf-input-group-inline">'+('<label class="attr-input-label">User Email</label><div class="mf-inputs"><select class="attr-form-control" id="mf_auth_reg_user_email" name="mf_auth_reg_user_email">'+s+"</select></div>")+'</div><div class="mf-input-group mf-input-group-inline"><label class="attr-input-label">Role</label><div class="mf-inputs"><select class="attr-form-control" id="mf_auth_reg_role" name="mf_auth_reg_role"><option value="administrator">Administrator</option><option value="editor">Editor</option><option value="author">Author</option><option value="contributor">Contributor</option><option selected="selected" value="subscriber">Subscriber</option></select></div></div>';e(".mf_register_form_fields").html(o),0!=t&&(e('#mf_auth_reg_user_name option[value="'+t.mf_auth_reg_user_name+'"]').prop("selected",!0),e('#mf_auth_reg_user_email option[value="'+t.mf_auth_reg_user_email+'"]').prop("selected",!0),e('#mf_auth_reg_role option[value="'+t.mf_auth_reg_role+'"]').prop("selected",!0))},error:function(e){}})},error:function(e){}}),e(".mf-login").length&&e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_fields_data/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(t){var i=t,s="";e.ajax({url:window.metform_api.resturl+"xs/login/settings/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(t){Object.keys(i).map(function(e){return[i[e]]}).map(e=>{s+="<option value="+e[0].mf_input_name+">"+e[0].mf_input_label+"</option>"});var o='<div class="mf-input-group mf-input-group-inline">'+('<label class="attr-input-label">User Name</label><div class="mf-inputs"><select class="attr-form-control" id="mf_auth_login_user_name" name="mf_auth_login_user_name">'+s+"</select></div>")+'</div><div class="mf-input-group mf-input-group-inline">'+('<label class="attr-input-label">User Password</label><div class="mf-inputs"><select class="attr-form-control" id="mf_auth_login_user_password" name="mf_auth_login_user_password">'+s+"</select></div>")+"</div>";e(".mf_login_form_fields").html(o),0!=t&&(e('#mf_auth_login_user_name option[value="'+t.mf_auth_login_user_name+'"]').prop("selected",!0),e('#mf_auth_login_user_password option[value="'+t.mf_auth_login_user_password+'"]').prop("selected",!0))},error:function(e){}})},error:function(e){}}),e(".mf-form-to-post").length&&e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_fields_data/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(s){var a=s,r="";e.ajax({url:window.metform_api.resturl+"xs/post/settings/"+o,type:"get",headers:{"X-WP-Nonce":m},dataType:"json",success:function(s){Object.keys(a).map(function(e){return[a[e]]}).map(e=>{r+="<option value="+e[0].mf_input_name+">"+e[0].mf_input_label+"</option>"});var o='<label class="attr-input-label">Title</label><div class="mf-inputs"><select class="attr-form-control mf_post_submission_title" id="mf_post_submission_title" name="mf_post_submission_title">'+r+"</select></div>",n='<label class="attr-input-label">Content</label><div class="mf-inputs"><select class="attr-form-control mf_post_submission_content" id="mf_post_submission_content" name="mf_post_submission_content">'+r+"</select></div>",m='<label class="attr-input-label">Featured Image</label><div class="mf-inputs"><select class="attr-form-control mf_post_submission_featured_image" id="mf_post_submission_featured_image" name="mf_post_submission_featured_image">'+r+"</select></div>",l=i(r);if(0!=s.custom_fields_settings){l="";var f=Object.entries(s.custom_fields_settings);for(const[e,t]of f)console.log(e+" "+t),l+=i(r,e,t)}console.log(s);var c='<div class="mf-input-group mf-input-group-inline">'+o+'</div><div class="mf-input-group mf-input-group-inline">'+n+'</div></div><div class="mf-input-group mf-input-group-inline">'+m+'</div><div class="mf-input-group mf-input-group-inline">'+function(e,t){return'<label class="attr-input-label">Custom Fields</label>\n                                <div class="mf-inputs mf-cf-fields">\n                                <div style="display:none">\n                                <div id="mf-cf-single-field" class="mf-cf-single-field"">\n                                <div style="width:50%;display:inline-block;">\n                                <label>Name</label>\n                                <input type="text" name="mf_post_submission_custom_fields_name[]" class="attr-form-control" >\n                                </div>\n                                <div style="width:50%;display:inline-block;">\n                                <label>Select Field</label><br>\n                                <select name="mf_post_submission_mf_field_name[]" class="attr-form-control">'+t+'</select>\n                                </div>\n                                <a href="#" class="mf-btn-del-singl-field" style="color:red">Delete</a>\n                                </div>\n                                </div>\n                                <div class="repeaterResult">'+e+'</div>\n                                <button class="mf-add-cf" type="button">+</button>\n                                </div>'}(l,r)+"</div>";e(".mf-post-submission-fields-section").html(c);var d=0;e(".mf-add-cf").click(function(){var i=e("#mf-cf-single-field").clone();d++,i.attr("id","mf-repeater-field-"+d),e(".mf-btn-del-singl-field",i).attr("data-id",d),i.appendTo(e(".repeaterResult")),t()}),t(),0!=s.fields_settings&&(e('.mf_post_submission_post_type option[value="'+s.fields_settings.mf_post_submission_post_type+'"]').prop("selected",!0),e('.mf_post_submission_title option[value="'+s.fields_settings.mf_post_submission_title+'"]').prop("selected",!0),e('.mf_post_submission_content option[value="'+s.fields_settings.mf_post_submission_content+'"]').prop("selected",!0),e('.mf_post_submission_featured_image option[value="'+s.fields_settings.mf_post_submission_featured_image+'"]').prop("selected",!0),e('.mf_post_submission_author option[value="'+s.fields_settings.mf_post_submission_author+'"]').prop("selected",!0))},error:function(e){}})},error:function(e){}}),function(t){var i=e("#metform-form-modalinput-settings").attr("data-nonce"),s=e(".get-response-campaign-list");e.ajax({url:window.metform_api.resturl+"metform/v1/entries/get_response_list/"+t,type:"get",headers:{"X-WP-Nonce":i},dataType:"json",success:function(e){s.empty(),e.length&&e.forEach(e=>{s.append("<option value="+e.campaignId+">"+e.description+"</option>")})},error:function(e){}})}(o),function(t){var i=e(".metfrom-btn-refresh-hubsopt-list");i.addClass("mf-setting-spin");var s=e("#metform-form-modalinput-settings").attr("data-nonce"),o=e(".hubspot_forms"),a=t;e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_hubspot_forms/"+a,type:"get",headers:{"X-WP-Nonce":s},dataType:"json",success:function(e){try{o.empty(),o.append('<option value="select">Select a form</option>'),e.forEach(e=>{o.append("<option value="+e.portalId+" guid="+e.guid+">"+e.name+"</option>")})}catch(e){}i.removeClass("mf-setting-spin")},error:function(e){i.removeClass("mf-setting-spin")}})}(o),function(t){e("#metform_form_modal");var i,s=e("#metform-form-modalinput-settings").attr("data-nonce"),o=e(".mailchimp_list");i=t,e.ajax({url:window.metform_api.resturl+"metform/v1/entries/get_mailchimp_list/"+i,type:"get",headers:{"X-WP-Nonce":s},dataType:"json",success:function(e){try{o.empty(),e.lists.forEach(e=>{o.append("<option value="+e.id+">"+e.name+"</option>")})}catch(e){}},error:function(e){}})}(o),a.find("form").attr("data-mf-id",o),a.find(".get-response-campaign-list").attr("get-response-list-id",o)}),e(".metform-form-save-btn-editor").on("click",function(){e(".metform-form-save-btn-editor").attr("disabled",!0);var t=e("#metform-form-modalinput-settings");t.attr("data-open-editor","1"),t.trigger("submit")}),e("#metform-form-modalinput-settings").on("submit",function(t){t.preventDefault();var i=e("#metform-form-modal"),s=e(this);i.addClass("loading"),e(".metform-form-save-btn-editor").attr("disabled",!0),e(".metform-form-save-btn").attr("disabled",!0);var o=e(this).serialize(),a=e(this).attr("data-mf-id"),r=e(this).attr("data-open-editor"),n=e(this).attr("data-editor-url"),m=e(this).attr("data-nonce");e.ajax({url:window.metform_api.resturl+"metform/v1/forms/update/"+a,type:"post",data:o,headers:{"X-WP-Nonce":m},dataType:"json",success:function(t){e("#message").css("display","block"),1==t.saved?(e("#post-"+t.data.id).find(".row-title").html(t.data.title),e("#message").removeClass("attr-alert-warning").addClass("attr-alert-success").html(t.status)):e("#message").removeClass("attr-alert-success").addClass("attr-alert-warning").html(t.status),setTimeout(function(){e("#message").css("display","none"),s.find(".attr-close").trigger("click")},1e3),i.removeClass("loading"),"1"==r&&1==t.saved?setTimeout(function(){window.location.href=n+"?post="+t.data.id+"&action=elementor"},1e3):"0"!=a?(e(".metform-form-save-btn-editor").removeAttr("disabled"),e(".metform-form-save-btn").removeAttr("disabled")):"0"==a&&setTimeout(function(){location.reload()},1e3)}})});var s=e(".mf-entry-title"),o=e(".mf-form-user-confirmation"),a=e(".mf-form-admin-notification"),r=e(".mf-input-rest-api-group"),n=e(".mf-mailchimp"),m=e(".mf-get_response"),l=e(".mf-zapier"),f=e(".mf-slack"),c=e(".mf-paypal"),d=e(".mf-stripe"),p=e(".mf-ckit"),_=e(".mf-aweber"),u=e(".mf-mail-poet");function h(t,i=null){var s=e("#metform-form-modalinput-settings").attr("data-nonce");e('.mf-mailster-list-id option[value="'+t+'"]').prop("selected",!0),e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_fields_data/"+i,type:"get",headers:{"X-WP-Nonce":s},dataType:"json",success:function(s){console.log(s);var o=s,a="";Object.keys(o).map(function(e){return[o[e]]}).map(e=>{a+="<option value="+e[0].mf_input_name+">"+e[0].mf_input_label+"</option>"}),function(t,i,s){var o=e("#metform-form-modalinput-settings").attr("data-nonce");e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_mailster_form/"+t,type:"get",headers:{"X-WP-Nonce":o},dataType:"json",success:function(t){var o="";for(const[e,s]of Object.entries(t))if("fields"==e)for(const[e,t]of Object.entries(s))o+='<div class="mf-input-group mf-input-group-inline"><label class="attr-input-label">'+t.name+'</label><div class="mf-inputs"><select class="attr-form-control" id="mailster_field_'+e+'" name="mailster_field_'+e+'">'+i+"</select></div></div>";e(".mf-mailster-settings-section").html(o),function(t,i){var s=window.mf_mailster_list_id;if(e(".mf-mailster-list-id").val()==s){var o=e("#metform-form-modalinput-settings").attr("data-nonce");e.ajax({url:window.metform_api.resturl+"metform/v1/forms/get_mailster_form_data/"+i,type:"get",headers:{"X-WP-Nonce":o},dataType:"json",success:function(t){for(const[i,s]of Object.entries(t))for(const[t,i]of Object.entries(s))console.log(t+" = "+i),e("#"+t+' option[value="'+i+'"]').prop("selected",!0)},error:function(e){console.log("Can not get mailster forms fields")}})}}(0,s)},error:function(e){console.log("Can not get mailster forms fields")}})}(t,a,i)},error:function(e){}})}function v(t){if(s.hide(),o.hide(),a.hide(),r.hide(),n.hide(),l.hide(),f.hide(),c.hide(),d.hide(),p.hide(),_.hide(),u.hide(),""!=t.form_title){e(".mf-form-modalinput-title").val(t.form_title),e(".mf-form-modalinput-success_message").val(t.success_message),e(".mf-entry-title-input").val(void 0!==t.entry_title&&""!=t.entry_title?t.entry_title:void 0===t.entry_title||""==t.entry_title?"Entry # [mf_id]":""),e(".mf-form-modalinput-redirect_to").val(t.redirect_to),e(".mf-form-modalinput-success_url").val(t.success_url),e(".mf-form-modalinput-failed_cancel_url").val(t.failed_cancel_url),e(".mf-form-modalinput-limit_total_entries").val(t.limit_total_entries);var i=e(".mf-form-modalinput-store_entries");"1"==t.store_entries?(i.attr("checked",!0),s.show()):(i.removeAttr("checked"),s.hide());var m=e(".mf-form-modalinput-hide_form_after_submission");"1"==t.hide_form_after_submission?m.attr("checked",!0):m.removeAttr("checked");var v=e(".mf-form-modalinput-require_login");"1"==t.require_login?v.attr("checked",!0):v.removeAttr("checked");var g=e(".mf-form-modalinput-limit_status");"1"==t.limit_total_entries_status?g.attr("checked",!0):g.removeAttr("checked");var b=e(".mf-form-modalinput-count_views");"1"==t.count_views?b.attr("checked",!0):b.removeAttr("checked");var k=e(".mf-form-modalinput-multiple_submission");"1"==t.multiple_submission?k.attr("checked",!0):k.removeAttr("checked");var w=e(".mf-form-modalinput-enable_recaptcha");"1"==t.enable_recaptcha?w.attr("checked",!0):w.removeAttr("checked");var y=e(".mf-form-modalinput-capture_user_browser_data");"1"==t.capture_user_browser_data?(y.attr("checked",!0),e("#multiple_submission").removeClass("hide_input"),e("#multiple_submission").addClass("show_input")):y.removeAttr("checked"),e(".mf-form-user-email-subject").val(t.user_email_subject),e(".mf-form-user-email-from").val(t.user_email_from),e(".mf-form-user-reply-to").val(t.user_email_reply_to),e(".mf-form-user-email-body").val(t.user_email_body);var j=e(".mf-form-user-enable");"1"==t.enable_user_notification?(j.attr("checked",!0),o.show()):(j.removeAttr("checked"),o.hide());var x=e(".mf-form-user-submission-copy");"1"==t.user_email_attach_submission_copy?x.attr("checked",!0):x.removeAttr("checked"),e(".mf-form-admin-email-subject").val(t.admin_email_subject),e(".mf-form-admin-email-from").val(t.admin_email_from),e(".mf-form-admin-email-to").val(t.admin_email_to),e(".mf-form-admin-reply-to").val(t.admin_email_reply_to),e(".mf-form-admin-email-body").val(t.admin_email_body);var C=e(".mf-form-admin-enable");"1"==t.enable_admin_notification?(C.attr("checked",!0),a.show()):(C.removeAttr("checked"),a.hide());var A=e(".mf-form-admin-submission-copy");"1"==t.admin_email_attach_submission_copy?A.attr("checked",!0):A.removeAttr("checked");var T=e(".mf-form-modalinput-rest_api");"1"==t.mf_rest_api?(T.attr("checked",!0),e(".mf-rest-api").show()):(T.removeAttr("checked"),e(".mf-rest-api").hide());var P=e(".mf-form-modalinput-mail_chimp");"1"==t.mf_mail_chimp?(P.attr("checked",!0),n.show()):(P.removeAttr("checked"),n.hide());let r=e(".mf-form-modalinput-ckit"),h=e(".mf-form-modalinput-mail_aweber"),J=e(".mf-form-modalinput-mail_poet");if("1"==t.mf_convert_kit?(r.attr("checked",!0),p.show()):(r.removeAttr("checked"),p.hide()),"1"==t.mf_mail_aweber?(h.attr("checked",!0),_.show()):(h.removeAttr("checked"),_.hide()),"1"==t.mf_mail_poet?(J.attr("checked",!0),u.show()):(J.removeAttr("checked"),u.hide()),t.ckit_opt){let i=e("select.mf-ckit-list-id").first(),s=t.mf_ckit_list_id||"";i.html(),t.ckit_opt.forEach(function(e){i.append('<option value="'+e.id+'">'+e.name+"</option>")}),i.val(s)}if(t.aweber_opt){let i=e("select.mf-aweber-list-id").first(),s=t.mf_aweber_list_id||"";i.html();for(let e in t.aweber_opt)i.append('<option value="'+t.aweber_opt[e].id+'">'+t.aweber_opt[e].name+"</option>");i.val(s)}if(t.mp_opt){let i=e("select.mf-mail-poet-list-id").first(),s=t.mf_mail_poet_list_id||"";i.html();for(let e in t.mp_opt)i.append('<option value="'+t.mp_opt[e].id+'">'+t.mp_opt[e].name+"</option>");i.val(s)}var N=e(".mf-form-modalinput-active_campaign");"1"==t.mf_active_campaign?N.attr("checked",!0):N.removeAttr("checked");var W=e(".mf-form-modalinput-get_response");"1"==t.mf_get_response?(W.attr("checked",!0),e(".mf-get_response").show()):(W.removeAttr("checked"),e(".mf-get_response").hide());var z=e(".mf-hubsopt");"1"==t.mf_hubspot?z.attr("checked",!0):z.removeAttr("checked");var X=e(".mf-hubspot-forms"),O=e(".hubspot_forms_section");"1"==t.mf_hubspot_forms?(X.attr("checked",!0),O.show()):(X.removeAttr("checked"),O.hide()),e(".mf_hubspot_form_portalId").val(t.mf_hubspot_form_portalId),e(".mf_hubspot_form_guid").val(t.mf_hubspot_form_guid);var S=e(".mf-zoho");"1"==t.mf_zoho?S.attr("checked",!0):S.removeAttr("checked");var E=e(".mf-form-modalinput-mailster"),D=e(".mf-mailster-settings-section");"1"==t.mf_mailster?(E.attr("checked",!0),D.show(),e(".mf-mailster-forms").show()):(E.removeAttr("checked"),D.hide(),e(".mf-mailster-forms").hide());var I=e(".mf-register");1==t.mf_registration?(I.attr("checked",!0),e(".mf_register_form_fields").show()):(I.removeAttr("checked"),e(".mf_register_form_fields").hide());var U=e(".mf-login");1==t.mf_login?(U.attr("checked",!0),e(".mf_login_form_fields").show()):(e(".mf_login_form_fields").hide(),U.removeAttr("checked"));var q=e(".mf-form-to-post"),R=e(".mf-form-to-post-fields");1==t.mf_form_to_post?(q.attr("checked",!0),R.show()):(q.removeAttr("checked"),R.hide());var F=e(".mf-form-modalinput-zapier");"1"==t.mf_zapier?(F.attr("checked",!0),l.show()):(F.removeAttr("checked",!0),l.hide());var Q=e(".mf-form-modalinput-slack");"1"==t.mf_slack?(Q.attr("checked",!0),f.show()):(Q.removeAttr("checked",!0),f.hide());var G=e(".mf-form-modalinput-paypal");"1"==t.mf_paypal?(G.attr("checked",!0),c.show()):(G.removeAttr("checked",!0),c.hide());var K=e(".mf-form-modalinput-stripe");"1"==t.mf_stripe?(K.attr("checked",!0),d.show()):(K.removeAttr("checked",!0),d.hide());K=e(".mf-form-modalinput-stripe");"1"==t.mf_stripe?(K.attr("checked",!0),d.show()):(K.removeAttr("checked",!0),d.hide());var L=e(".mf-form-modalinput-paypal_sandbox");"1"==t.mf_paypal_sandbox?L.attr("checked",!0):L.removeAttr("checked",!0);var B=e(".mf-form-modalinput-stripe_sandbox");"1"==t.mf_stripe_sandbox?B.attr("checked",!0):B.removeAttr("checked",!0);var H=t.mf_rest_api_method&&t.mf_rest_api_method.length?t.mf_rest_api_method:"POST";e('.mf-rest-api-method option[value="'+H+'"]').prop("selected",!0),e(".mf-rest-api-url").val(t.mf_rest_api_url),e(".mf-mailchimp-api-key").val(t.mf_mailchimp_api_key),e(".mf-mailchimp-list-id").val(t.mf_mailchimp_list_id),""==t.mf_mailchimp_list_id&&e(".mf-mailchimp-list-id").val(e(".mailchimp_list").find(":selected").val()),0!=t.mf_mailchimp_list_id&&e('.mailchimp_list option[value="'+t.mf_get_response_list_id+'"]').prop("selected",!0),e(".mf-get_response-list-id").val(t.mf_get_response_list_id),0!=t.mf_get_response_list_id&&e('.get-response-campaign-list option[value="'+t.mf_get_response_list_id+'"]').prop("selected",!0),e(".mf-zapier-web-hook").val(t.mf_zapier_webhook),e(".mf-slack-web-hook").val(t.mf_slack_webhook),e(".mf-paypal-email").val(t.mf_paypal_email),e(".mf-paypal-token").val(t.mf_paypal_token),e(".mf-stripe-image-url").val(t.mf_stripe_image_url),e(".mf-stripe-live-publishiable-key").val(t.mf_stripe_live_publishiable_key),e(".mf-stripe-live-secret-key").val(t.mf_stripe_live_secret_key),e(".mf-stripe-test-publishiable-key").val(t.mf_stripe_test_publishiable_key),e(".mf-stripe-test-secret-key").val(t.mf_stripe_test_secret_key),e(".mf-recaptcha-site-key").val(t.mf_recaptcha_site_key),e(".mf-recaptcha-secret-key").val(t.mf_recaptcha_secret_key),e("input.mf-form-modalinput-limit_status, .mf-form-modalinput-rest_api").trigger("change")}(window.mf_mailster_list_id=t.mf_mailster_list_id,e('.mf-mailster-list-id option[value="'+t.mf_mailster_list_id+'"]').prop("selected",!0),e(".mf-form-modalinput-mailster").length)&&h(e(".mf-mailster-list-id").find(":selected").val(),e("#metform_form_modal").find("form").attr("data-mf-id"))}e("input.mf-form-modalinput-store_entries").on("change",function(){e(this).is(":checked")?s.show():e(this).is(":not(:checked)")&&s.hide()}),e("input.mf-form-modalinput-limit_status").on("change",function(){e(this).is(":checked")?e("#limit_status").find("input").removeAttr("disabled"):e(this).is(":not(:checked)")&&e("#limit_status").find("input").attr("disabled","disabled")}),e("input.mf-form-user-enable").on("change",function(){e(this).is(":checked")?o.show():e(this).is(":not(:checked)")&&o.hide()}),e("input.mf-form-admin-enable").on("change",function(){e(this).is(":checked")?a.show():e(this).is(":not(:checked)")&&a.hide()}),e("input.mf-form-modalinput-rest_api").on("change",function(){e(this).is(":checked")?r.show():e(this).is(":not(:checked)")&&r.hide()}),e("input.mf-form-modalinput-mail_chimp").on("change",function(){e(this).is(":checked")?n.show():e(this).is(":not(:checked)")&&n.hide()}),e(".mf-form-modalinput-get_response").on("change",function(){e(this).is(":checked")?m.show():m.hide()}),e("input.mf-form-modalinput-mail_aweber").on("change",function(){e(this).is(":checked")?_.show():e(this).is(":not(:checked)")&&_.hide()}),e("input.mf-form-modalinput-mail_poet").on("change",function(){e(this).is(":checked")?u.show():e(this).is(":not(:checked)")&&u.hide()}),e("input.mf-form-modalinput-ckit").on("change",function(){e(this).is(":checked")?p.show():e(this).is(":not(:checked)")&&p.hide()}),e("input.mf-form-modalinput-zapier").on("change",function(){e(this).is(":checked")?l.show():e(this).is(":not(:checked)")&&l.hide()}),e("input.mf-form-modalinput-slack").on("change",function(){e(this).is(":checked")?f.show():e(this).is(":not(:checked)")&&f.hide()}),e("input.mf-form-modalinput-paypal").on("change",function(){e(this).is(":checked")?c.show():e(this).is(":not(:checked)")&&c.hide()}),e("input.mf-form-modalinput-stripe").on("change",function(){e(this).is(":checked")?stripe.show():e(this).is(":not(:checked)")&&stripe.hide()}),e("input.mf-form-modalinput-stripe_sandbox").on("change",function(){e(this).is(":checked")?e(".mf_stripe_sandbox").show():e(this).is(":not(:checked)")&&e(".mf_stripe_sandbox").hide()}),e(".mf-hubspot-forms").on("change",function(){e(this).is(":checked")?e(".hubspot_forms_section").show():e(".hubspot_forms_section").hide()}),e(".mf-register").on("change",function(){e(this).is(":checked")?e(".mf_register_form_fields").show():e(".mf_register_form_fields").hide()}),e(".mf-login").on("change",function(){e(this).is(":checked")?e(".mf_login_form_fields").show():e(".mf_login_form_fields").hide()}),e(".mf-form-to-post").on("change",function(){e(this).is(":checked")?e(".mf-form-to-post-fields").show():e(".mf-form-to-post-fields").hide()}),e(".mf-form-modalinput-mailster").on("change",function(){e(this).is(":checked")?(e(".mf-mailster-settings-section").show(),e(".mf-mailster-forms").show()):(e(".mf-mailster-settings-section").hide(),e(".mf-mailster-forms").hide())}),e(".mf-mailster-list-id").on("change",function(){var t=e(this).val(),i=e("#metform-form-modalinput-settings").attr("data-mf-id");console.log(window.mf_mailster_list_id),console.log(h(t,i))}),e(".get-response-campaign-list").on("change",function(){e(".mf-get_response-list-id ").val(e(this).val())}),e("input.mf-form-modalinput-capture_user_browser_data").click(function(){e(this).is(":checked")?(e("#multiple_submission").removeClass("hide_input"),e("#multiple_submission").addClass("show_input")):e(this).is(":not(:checked)")&&(e("#multiple_submission").removeClass("show_input"),e("#multiple_submission").addClass("hide_input"))}),e(".mf-settings-tab .mf-setting-nav-link").on("click",function(t){if(!e(this).hasClass("mf-setting-nav-hidden")){t.preventDefault();var i=e(this).attr("href");window.location.hash=i,e(this).parent().addClass("nav-tab-active").siblings().removeClass("nav-tab-active"),e(i).addClass("active").siblings().removeClass("active")}}),e(".mf-setting-nav-link").on("click",function(t){e(this).hasClass("mf-setting-nav-hidden")?t.preventDefault():(e(this).parents(".nav-tab-wrapper").find("a").removeClass("top").removeClass("bottom"),e(this).parents("li").prev().find("a").addClass("top"),e(this).parents("li").next().find("a").addClass("bottom"))});var g=e(".mf-settings-tab .mf-setting-nav-link").eq(1).attr("href");if(window.location.hash&&(g=window.location.hash),e('.mf-settings-tab .mf-setting-nav-link[href="'+g+'"]').trigger("click"),e(window).on("resize.mfSettings",function(){e(".mf-setting-sidebar").css("width",e(".mf-setting-sidebar-column").width())}).trigger("resize.mfSettings"),e(".mf-setting-header").length>0){var b=e(".mf-setting-header").offset().top;e(window).scroll(function(){var t=e(".mf-setting-header");e(window).scrollTop()>=b?t.addClass("fixed").css({width:jQuery(".metform-admin-container").width()}):t.removeClass("fixed").css({width:"auto"})})}e(".mf-admin-single-accordion").on("click",".mf-admin-single-accordion--heading",function(){e(this).next().slideToggle().parent().toggleClass("active").siblings().removeClass("active").find(".mf-admin-single-accordion--body").slideUp()}),e(".mf-admin-single-accordion:first-child .mf-admin-single-accordion--heading").trigger("click"),e(".mf-recaptcha-version").on("change",function(){var t=e(this).val();e("#mf-"+t).fadeIn().siblings().hide()}),e(".mf-recaptcha-version").trigger("change"),e(".mf-form-modalinput-stripe_sandbox").on("change",function(){var t=e(this).parents(".attr-form-group").eq(0).next(".mf-form-modalinput-stripe_sandbox_keys");e(this).is(":checked")?t.fadeIn():t.fadeOut()}),e(".mf-form-modalinput-stripe_sandbox").trigger("change"),e(document).on("click","#met_pro_aweber_authorize",function(t){t.preventDefault();let i=e(this).closest("p.description");i.html("<span>Wait....</span>");var s=metform_api.admin_url+"admin-ajax.php",o={action:"get_aweber_authorization_url",api_key:e("#mf_aweber_dev_api_key").val(),api_sec:e("#mf_aweber_dev_api_sec").val()};e.ajax({url:s,method:"POST",data:o,dataType:"json",success:function(e){if(!0===e.success){let t='<a class=" button mf-setting-btn-link" href="'+e.data.url+'">Authorize The App </a>';i.html(t)}else if(e.data){let t=e.data;i.html('<span style="background-color: red; padding: 1px 5px;">'+t.msg+"</span>")}},error:function(e){i.html('<span style="color: red"> ajax error occurred, please check your internet connection..</span>')},complete:function(){}})}),e(document).on("click","#met_pro_aweber_propmpt_re_auth",function(t){t.preventDefault(),e("#mf_aweber_dev_api_key").val("").prop("disabled",!1),e("#mf_aweber_dev_api_sec").val("").prop("disabled",!1),e(this).closest("p.description").html('<a class="button mf-setting-btn-link" id="met_pro_aweber_re_authorize"> Get Re - Authorization URL </a>')}),e(document).on("click","#met_pro_aweber_re_authorize",function(t){t.preventDefault();let i=e(this).closest("p.description");i.html("<span>Wait....</span>");let s=e("#mf_aweber_dev_api_key").val();if(!s||s.length<1)return i.html('<span style="color: red">API Key can not be empty..</span>'),!1;var o=metform_api.admin_url+"admin-ajax.php",a={action:"get_aweber_re_authorization_url",api_key:s,api_sec:e("#mf_aweber_dev_api_sec").val()};e.ajax({url:o,method:"POST",data:a,dataType:"json",success:function(e){if(!0===e.success){let t=e.data;if("ok"==t.result){let e='<a class="mf-setting-btn-link" href="'+t.url+'">Authorize The App </a>';i.html(e)}else i.html("<span>"+t.msg+"</span>")}else if(e.data){let t=e.data;i.html('<span style="background-color: red; padding: 1px 5px;">'+t.msg+"</span>")}},error:function(e){i.html('<span style="color: red"> ajax error occurred, please check your internet connection..</span>')},complete:function(){}})}),e(document).on("click","#met_form_aweber_get_list",function(t){t.preventDefault();let i=e(this),s=e("#mf_aweber_info"),o=metform_api.admin_url+"admin-ajax.php";e.ajax({url:o,method:"POST",data:{action:"get_list_lists"},dataType:"json",success:function(e){if(!0===e.success){let t=e.data,o=i.closest("div.mf-aweber").find("select");if(o.html(""),t.lists)for(let e in t.lists)o.append('<option value="'+t.lists[e].id+'">'+t.lists[e].name+"</option>");s.html("")}else if(e.data){let t=e.data;s.html('<span style="background-color: red; padding: 1px 5px;">'+t.msg+"</span>")}},error:function(e){s.html('<span style="color: red"> ajax error occurred, please check your internet connection..</span>')},complete:function(){}})}),e(document).on("click","#met_form_mail_poet_get_list",function(t){t.preventDefault();let i=e(this),s=e("#mf_mail_poet_info"),o=metform_api.admin_url+"admin-ajax.php";e.ajax({url:o,method:"POST",data:{action:"mail_poet_get_email_list_lists"},dataType:"json",success:function(e){if(!0===e.success){let t=e.data,o=i.closest("div.mf-mail-poet").find("select");if(o.html(""),t.lists)for(let e in t.lists)o.append('<option value="'+t.lists[e].id+'">'+t.lists[e].name+"</option>");s.html("")}else if(e.data){let t=e.data;s.html('<span style="background-color: red; padding: 1px 5px;">'+t.msg+"</span>")}},error:function(e){s.html('<span style="color: red"> ajax error occurred, please check your internet connection..</span>')},complete:function(){}})}),e(document).on("click","#met_form_ckit_get_list",function(t){t.preventDefault();var i=metform_api.admin_url+"admin-ajax.php";let s=e(this);e.ajax({url:i,method:"POST",data:{action:"get_form_lists"},dataType:"json",success:function(e){if(!0===e.success){let t=e.data,i=s.closest("div.mf-ckit").find("select");i.html(""),t.forms&&t.forms.forEach(function(e){i.append('<option value="'+e.id+'">'+e.name+"</option>")})}else alert("Error occurred when trying to check for aweber authorization.")},error:function(e){},complete:function(){}})})});