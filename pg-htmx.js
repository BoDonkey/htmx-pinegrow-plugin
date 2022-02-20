$(function () {
    $('body').one('pinegrow-ready', function (e, pinegrow) {
        let type_prefix = 'pg-htmx';

        var framework = new PgFramework(type_prefix, 'HTMXforPG');

        framework.type = 'htmx';
        framework.allow_single_type = true;

        framework.description = 'This framework adds support for the HTMX library to Pinegrow.';
        framework.author = "'Bo' @ springhilldesign.net";
        framework.author_link = 'https://plugins.springhilldesign.net';

        framework.has_actions = true;
        
        //to keep the plugin loaded between pages and projects we need to set the default to true.
        //Comment the line below out to block this behavior
        framework.default = true;

        pinegrow.addFramework(framework);

        //Uncomment the line below to get the inspector window to automatically open
        //require('nw.gui').Window.get().showDevTools();

        //Adds a menu item for adding the HTMX script
        framework.on_page_menu = (page, items) => {
            items.push({
                type: 'divider'
            });

            items.push({
                type: 'header',
                label: 'HTMX'
            });

            items.push({
                label: 'Add HTMX script',
                action: function () {
                    addHTMXScript();
                }
            });

            items.push({
                type: 'divider'
            })
        };

        //Function to add HTMX script - ommited version so should load latest
        let addHTMXScript = () => {
            let thePage = pinegrow.getSelectedPage();
            thePage.addScript('https://unpkg.com/htmx.org', true, false, false);
        }

        /*
        This section adds in all of the HTMX attributes.
        These are being added to the Actions panel since they can be added to essentially any HTML element.
        */

        let htmx_attributes = []; // Attributes to be added to the Actions panel

        let boostAttribute = new PgComponentType('htmx-hx-boost', 'hx-Boost', {
            selector: '[hx-boost]',
            attribute: 'hx-boost',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Boost normal anchors and form tags to use AJAX. Inheritable.',
                helplink: 'https://htmx.org/attributes/hx-boost/',
            },
            sections: {
                hx_att_boost: {
                    name: 'Boost',
                    fields: {
                        hx_boost: {
                            'name': 'Add hx-boost?',
                            'type': 'checkbox',
                            'action': 'element_attribute',
                            'attribute': 'hx-boost',
                            'value': 'true',
                            'attribute_keep_if_empty': true
                        }
                    }
                }
            }
        });
        htmx_attributes.push(boostAttribute);

        let confirmAttribute = new PgComponentType('htmx-hx-confirm', 'hx-Confirm', {
            selector: '[hx-confirm]',
            attribute: 'hx-confirm',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Adds a confirmation event prior to action, for example <code>hx-delete</code>.',
                helplink: 'https://htmx.org/attributes/hx-confirm/',
            },
            sections: {
                hx_att_confirm: {
                    name: 'Confirm',
                    fields: {
                        hx_confirm: {
                            'name': 'Confirm message?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-confirm',
                            'empty_attribute': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(confirmAttribute);

        let deleteAttribute = new PgComponentType('htmx-hx-delete', 'hx-Delete', {
            selector: '[hx-delete]',
            attribute: 'hx-delete',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Issues a DELETE to the specified URL and then swaps the returned HTML into the DOM - use with <code>hx-target</code>.',
                helplink: 'https://htmx.org/attributes/hx-delete/'
            },
            sections: {
                hx_att_delete: {
                    name: 'Delete',
                    fields: {
                        hx_delete: {
                            'name': 'Delete URL?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-delete',
                            'empty_attribute': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(deleteAttribute);
        
        let disableAttribute = new PgComponentType('htmx-hx-disable', 'hx-Disable', {
            selector: '[hx-disable]',
            attribute: 'hx-disable',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Disables HTMX processing for a section. Inheritable',
                helplink: 'https://htmx.org/attributes/hx-disable/'
            },
            sections: {
                hx_att_disable: {
                    name: 'Disable',
                    fields: {
                        hx_disable: {
                            'name': 'Disable section?',
                            'type': 'checkbox',
                            'action': 'element_attribute',
                            'attribute': 'hx-disable',
                            'empty_attribute': true,
                            'attribute_keep_if_empty': true
                        }
                    }
                }
            }
        });
        htmx_attributes.push(disableAttribute);

        let encodingAttribute = new PgComponentType('htmx-hx-encoding', 'hx-Encoding', {
            selector: '[hx-encoding]',
            attribute: 'hx-encoding',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Changes encoding to <code>multipart/form-data</code> for section. Inheritable',
                helplink: 'https://htmx.org/attributes/hx-encoding/'
            },
            sections: {
                hx_att_encoding: {
                    name: 'Encoding',
                    fields: {
                        hx_encoding: {
                            'name': 'Change encoding?',
                            'type': 'checkbox',
                            'action': 'element_attribute',
                            'attribute': 'hx-encoding',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false,
                            'value': 'multipart/form-data'
                        }
                    }
                }
            }
        });
        htmx_attributes.push(encodingAttribute);

        let extAttribute = new PgComponentType('htmx-hx-ext', 'hx-Ext', {
            selector: '[hx-ext]',
            attribute: 'hx-ext',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Enables an HTMX extension for a section. For multiple extensions add a comma separated list. Inheritable. Use the \'ignore:\' prefix on children that you don\'t want to target.',
                helplink: 'https://htmx.org/attributes/hx-ext/'
            },
            sections: {
                hx_att_ext: {
                    name: 'Ext',
                    fields: {
                        hx_ext: {
                            'name': 'Extension name(s)?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-ext',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(extAttribute);

        let getAttribute = new PgComponentType('htmx-hx-get', 'hx-Get', {
            selector: '[hx-get]',
            attribute: 'hx-get',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Issues a GET to the specified URL and then swaps the returned HTML into the DOM - use with <code>hx-target</code>.',
                helplink: 'https://htmx.org/attributes/hx-get/'
            },
            sections: {
                hx_att_get: {
                    name: 'get',
                    fields: {
                        hx_get: {
                            'name': 'GET URL?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-get',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(getAttribute);

        let headersAttribute = new PgComponentType('htmx-hx-headers', 'hx-Headers', {
            selector: '[hx-headers]',
            attribute: 'hx-headers',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to add to the AJAX headers. Should be valid JSON, but can be evaluated by prefixing with <code>js:</code>. Inheritable, but overridden by child declaration.',
                helplink: 'https://htmx.org/attributes/hx-headers/'
            },
            sections: {
                hx_att_headers: {
                    name: 'headers',
                    fields: {
                        hx_headers: {
                            'name': 'Header JSON (should be surrounded by {}).',
                            'placeholder': '{"myHeader": "My Value"}',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-headers',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(headersAttribute);

        let historyeltAttribute = new PgComponentType('htmx-hx-history-elt', 'hx-History-Elt', {
            selector: '[hx-history-elt]',
            attribute: 'hx-history-elt',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to specify an element to snapahot and restore page state. Usually added to the body element',
                helplink: 'https://htmx.org/attributes/hx-history-elt/'
            },
            sections: {
                hx_att_history_elt: {
                    name: 'history-elt',
                    fields: {
                        hx_history_elt: {
                            'name': 'Add attribute?',
                            'type': 'checkbox',
                            'action': 'element_attribute',
                            'attribute': 'hx-history-elt',
                            'empty_attribute': true,
                            'attribute_keep_if_empty': true
                        }
                    }
                }
            }
        });
        htmx_attributes.push(historyeltAttribute);

        let includeAttribute = new PgComponentType('htmx-hx-include', 'hx-Include', {
            selector: '[hx-include]',
            attribute: 'hx-include',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows inclusion of additional values in AJAX request. Inheritable.',
                helplink: 'https://htmx.org/attributes/hx-include/'
            },
            sections: {
                hx_att_include: {
                    name: 'Include',
                    fields: {
                        hx_include: {
                            'name': 'CSS selector?',
                            'placeholder': '[name="email"]',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-include',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(includeAttribute);

        let indicatorAttribute = new PgComponentType('htmx-hx-indicator', 'hx-Indicator', {
            selector: '[hx-indicator]',
            attribute: 'hx-indicator',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Specifies the element that will have the <code>htmx-request</code> class added and takes a CSS query selector with or without the closest keyword, (e.g. <code>closest tr</code>).',
                helplink: 'https://htmx.org/attributes/hx-indicator/'
            },
            sections: {
                hx_att_indicator: {
                    name: 'Indicator',
                    fields: {
                        hx_indicator: {
                            'name': 'CSS selector?',
                            'placeholder': '#spinner',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-indicator',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(indicatorAttribute);

        let paramsAttribute = new PgComponentType('htmx-hx-params', 'hx-Params', {
            selector: '[hx-params]',
            attribute: 'hx-params',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to filter the parameters submitted with an AJAX request. Takes \'*\', \'none\', \'not &lt;param-list&gt;\', or \'&lt;param-list&gt;\' with the list as a comma separated list of names. Inhertitable.',
                helplink: 'https://htmx.org/attributes/hx-params/'
            },
            sections: {
                hx_att_params: {
                    name: 'Params',
                    fields: {
                        hx_params: {
                            'name': 'Parameters?',
                            'placeholder': '*',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-params',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(paramsAttribute);

        let patchAttribute = new PgComponentType('htmx-hx-patch', 'hx-Patch', {
            selector: '[hx-patch]',
            attribute: 'hx-patch',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Submits a PATCH to the specified URL and swaps the returned HTML into the DOM - use with <code>hx-target</code>.',
                helplink: 'https://htmx.org/attributes/hx-params/'
            },
            sections: {
                hx_att_patch: {
                    name: 'Patch',
                    fields: {
                        hx_patch: {
                            'name': 'URL?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-patch',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(patchAttribute);

        let postAttribute = new PgComponentType('htmx-hx-post', 'hx-Post', {
            selector: '[hx-post]',
            attribute: 'hx-post',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Submits a POST to the specified URL and swaps the returned HTML into the DOM - use with <code>hx-target</code>.',
                helplink: 'https://htmx.org/attributes/hx-post/'
            },
            sections: {
                hx_att_post: {
                    name: 'Post',
                    fields: {
                        hx_post: {
                            'name': 'URL?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-post',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(postAttribute);

        let preserveAttribute = new PgComponentType('htmx-hx-preserve', 'hx-Preserve', {
            selector: '[hx-preserve]',
            attribute: 'hx-preserve',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows a section of content to remain unchanged between HTML replacement. Element <i>must</i> have an <b>id</b>.',
                helplink: 'https://htmx.org/attributes/hx-preserve/'
            },
            sections: {
                hx_att_preserve: {
                    name: 'Preserve',
                    fields: {
                        hx_preserve: {
                            'name': 'Preserve section?',
                            'type': 'checkbox',
                            'action': 'element_attribute',
                            'attribute': 'hx-preserve',
                            'value': true
                        }
                    }
                }
            }
        });
        htmx_attributes.push(preserveAttribute);

        let promptAttribute = new PgComponentType('htmx-hx-prompt', 'hx-Prompt', {
            selector: '[hx-prompt]',
            attribute: 'hx-prompt',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Shows a prompt and collects value before issuing a request. Value is added into header. Inherited.',
                helplink: 'https://htmx.org/attributes/hx-prompt/'
            },
            sections: {
                hx_att_prompt: {
                    name: 'Prompt',
                    fields: {
                        hx_post: {
                            'name': 'Prompt?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-prompt',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(promptAttribute);

        let push_urlAttribute = new PgComponentType('htmx-hx-push-url', 'hx-Push-Url', {
            selector: '[hx-push-url]',
            attribute: 'hx-push-url',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Pushes a new entry into the browser location bar and creates a history entry. Can be \'true\', \'false\', or a custom string. Inherited.',
                helplink: 'https://htmx.org/attributes/hx-push-url/'
            },
            sections: {
                hx_att_push_url: {
                    name: 'Push-url',
                    fields: {
                        hx_post: {
                            'name': 'String?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-push-url',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(push_urlAttribute);

        let putAttribute = new PgComponentType('htmx-hx-put', 'hx-Put', {
            selector: '[hx-put]',
            attribute: 'hx-put',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Submits a PUT to the specified URL and swaps the returned HTML into the DOM - use with <code>hx-target</code>.',
                helplink: 'https://htmx.org/attributes/hx-put/'
            },
            sections: {
                hx_att_put: {
                    name: 'Put',
                    fields: {
                        hx_put: {
                            'name': 'URL?',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-put',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(putAttribute);

        let requestAttribute = new PgComponentType('htmx-hx-request', 'hx-Request', {
            selector: '[hx-request]',
            attribute: 'hx-request',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to configure various aspects of the request. Takes \'timeout\' in ms, \'credentials\', or \'noHeaders\'. Special characters should be escaped and <code>js:</code> can be used to pass a function. Inheritable.',
                helplink: 'https://htmx.org/attributes/hx-request/'
            },
            sections: {
                hx_att_request: {
                    name: 'Request',
                    fields: {
                        hx_request: {
                            'name': 'Request value?',
                            'placeholder': '\'timeout\':100',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-request',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(requestAttribute);

        let selectAttribute = new PgComponentType('htmx-hx-select', 'hx-Select', {
            selector: '[hx-select]',
            attribute: 'hx-select',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to select content to be swapped from a response using a CSS selector. Inheritable.',
                helplink: 'https://htmx.org/attributes/hx-select/'
            },
            sections: {
                hx_att_select: {
                    name: 'Select',
                    fields: {
                        hx_select: {
                            'name': 'CSS selector?',
                            'placeholder': '#info-details',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-select',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(selectAttribute);

        let sseAttribute = new PgComponentType('htmx-hx-sse', 'hx-Sse', {
            selector: '[hx-sse]',
            attribute: 'hx-sse',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to work with <a href=\'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events\' target=\'_blank\'>Server Sent Event</a> <b>EventSources</b> directly from HTML. The value of the attribute can be one or more of the following, separated by white space: connect:&lt;url&gt; or swap&lt;eventName&gt;. Inheritable.',
                helplink: 'https://htmx.org/attributes/hx-sse/'
            },
            sections: {
                hx_att_sse: {
                    name: 'Sse',
                    fields: {
                        hx_sse: {
                            'name': 'Events?',
                            'placeholder': 'connect:/event_stream swap:eventName',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-sse',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(sseAttribute);

        let swapoobAttribute = new PgComponentType('htmx-hx-swap-oob', 'hx-Swap-oob', {
            selector: '[hx-swap-oob]',
            attribute: 'hx-swap-oob',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to specify content to be swapped into the DOM other than at the target. Values can be \'true\', &lt;hx-swap value&gt;, or &lt;hx-swap value&gt;:&lt;CSS selector&gt;.',
                helplink: 'https://htmx.org/attributes/hx-swap-oob/'
            },
            sections: {
                hx_att_swap_oob: {
                    name: 'Swap-oob',
                    fields: {
                        hx_swap_oob: {
                            'name': 'Value?',
                            'placeholder': 'afterend:#alert',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-swap-oob',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(swapoobAttribute);

        let swapAttribute = new PgComponentType('htmx-hx-swap', 'hx-Swap', {
            selector: '[hx-swap]',
            attribute: 'hx-swap',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to specify how the response will be swapped relative to the target of an AJAX request.',
                helplink: 'https://htmx.org/attributes/hx-swap/'
            },
            sections: {
                hx_att_swap: {
                    name: 'Swap',
                    fields: {
                        hx_swap: {
                            'name': 'Swap type?',
                            'type': 'select',
                            'action': 'element_attribute',
                            'attribute': 'hx-swap',
                            'options': [
                                {
                                    key: 'innerHTML',
                                    name: 'innerHTML'
                                },
                                {
                                    key: 'outerHTML',
                                    name: 'outerHTML'
                                },
                                {
                                    key: 'beforebegin',
                                    name: 'beforebegin'
                                },
                                {
                                    key: 'afterbegin',
                                    name: 'afterbegin'
                                },
                                {
                                    key: 'beforeend',
                                    name: 'beforeend'
                                },
                                {
                                    key: 'afterend',
                                    name: 'afterend'
                                },
                                {
                                    key: 'none',
                                    name: 'none'
                                }
                            ],
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(swapAttribute);

        let targetAttribute = new PgComponentType('htmx-hx-target', 'hx-Target', {
            selector: '[hx-target]',
            attribute: 'hx-target',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to target a different element for swapping than the AJAX request element. Can be a CSS query, <b>this</b>, <b>closest &lt;CSS selector&gt;</b>,or <b>find &lt;CSS selector&gt;</b>.',
                helplink: 'https://htmx.org/attributes/hx-target/'
            },
            sections: {
                hx_att_target: {
                    name: 'Target',
                    fields: {
                        hx_target: {
                            'name': 'Target selector?',
                            'placeholder': 'closest tr',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-target',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(targetAttribute);

        let triggerAttribute = new PgComponentType('htmx-hx-trigger', 'hx-Trigger', {
            selector: '[hx-trigger]',
            attribute: 'hx-trigger',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to specify what triggers an AJAX response. Can be an event name (with filters and modifiers), a polling def. of the form <b>every &lt;timing declaration&gt;</b>, or comma-separated list of events.',
                helplink: 'https://htmx.org/attributes/hx-trigger/'
            },
            sections: {
                hx_att_trigger: {
                    name: 'Trigger',
                    fields: {
                        hx_trigger: {
                            'name': 'Trigger?',
                            'placeholder': 'keyup changed delay:1s',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-trigger',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(triggerAttribute);

        let valsAttribute = new PgComponentType('htmx-hx-vals', 'hx-Vals', {
            selector: '[hx-vals]',
            attribute: 'hx-vals',
            action: true,
            not_main_type: true,
            meta: {
                helptext: 'Allows you to add to the parameters submitted with an AJAX request. Typically in JSON surrounded by {}, but can be prefixed with <code>javascript:</code> for evaluation. Inherited, but a child declaration will override.',
                helplink: 'https://htmx.org/attributes/hx-vals/'
            },
            sections: {
                hx_att_vals: {
                    name: 'vals',
                    fields: {
                        hx_vals: {
                            'name': 'Trigger?',
                            'placeholder': '{"myVal": "My Value"}',
                            'type': 'text',
                            'action': 'element_attribute',
                            'attribute': 'hx-vals',
                            'empty_attribute': false,
                            'attribute_keep_if_empty': false
                        }
                    }
                }
            }
        });
        htmx_attributes.push(valsAttribute);

        //function to add all of the components
        let addComponentTypesToPG = (list) => {
            list.forEach(component => {
                framework.addComponentType(component);
            });
        };

        //Add all of the defined components
        addComponentTypesToPG(htmx_attributes);

        //Define all of our sections
        //Actions
        let section = new PgFrameworkLibSection('htmxattributesactions', 'Attributes');
        section.setComponentTypes(htmx_attributes);
        section.closed = true;
        framework.addActionsSection(section);
    });
});
