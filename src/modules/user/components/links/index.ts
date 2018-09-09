import Vue from "vue";

import CreateMessageLink from "@/modules/user/components/links/CreateMessageLink";
import MessageLink from "@/modules/user/components/links/MessageLink";
import MessagesLink from "@/modules/user/components/links/MessagesLink";
import ProfileLink from "@/modules/user/components/links/ProfileLink";

Vue.component("CreateMessageLink", CreateMessageLink);
Vue.component("MessageLink", MessageLink);
Vue.component("MessagesLink", MessagesLink);
Vue.component("ProfileLink", ProfileLink);
