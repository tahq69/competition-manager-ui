import Vue from "vue";
import { Events } from "@/helpers/events/typings";

export const EventBus = new Vue();

export function onEvent(event: Events | Events[], callback: Function) {
  EventBus.$on(event, callback);
}

export function offEvent(event: Events | Events[], callback: Function) {
  EventBus.$off(event, callback);
}

export function emitEvent(event: Events, ...args: any[]) {
  EventBus.$emit.apply(EventBus, [event, ...args]);
}
