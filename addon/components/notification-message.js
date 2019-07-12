import { htmlSafe } from '@ember/string';
import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import Ember from 'ember';
import layout from '../templates/components/notification-message';

export default Component.extend({
  layout,

  classNames: ['notification-message'],
  classNameBindings: [
    'dismissClass',
    'clickableClass',
    'processedType',
    'notification.cssClasses'
  ],

  attributeBindings: ['notification.type:data-test-notification-message'],

  paused: false,

  dismissClass: computed('notification.dismiss', function() {
    if (!this.get('notification.dismiss')) return 'in';

    return false;
  }),

  clickableClass: computed('notification.onClick', function() {
    if (this.get('notification.onClick')) return 'clickable';

    return false;
  }),

  closeIcon: computed('icons', function() {
    switch (this.get('icons')){
      case 'bootstrap':
        return 'glyphicon glyphicon-remove';
      case 'semantic-ui':
        return 'remove icon';
    }

    return 'fa fa-times';
  }),

  // Set icon depending on notification type
  notificationIcon: computed('notification.type', 'icons', function() {
    const icons = this.get('icons');

    if (icons === 'bootstrap') {
      switch (this.get('notification.type')){
        case "info":
          return 'glyphicon glyphicon-info-sign';
        case "success":
          return 'glyphicon glyphicon-ok-sign';
        case "warning":
        case "error":
          return 'glyphicon glyphicon-exclamation-sign';
      }
    }

    if (icons === 'semantic-ui') {
      switch (this.get('notification.type')){
        case "info":
          return 'info circle icon';
        case "success":
          return 'checkmark icon';
        case "warning":
          return 'warning sign icon';
        case "error":
          return 'warning circle icon';
      }
    }

    switch (this.get('notification.type')){
      case "info":
        return 'fa fa-info-circle';
      case "success":
        return 'fa fa-check';
      case "warning":
        return 'fa fa-warning';
      case "error":
        return 'fa fa-exclamation-circle';
    }
  }),

  mouseDown() {
    if (this.get('notification.onClick')) {
      this.get('notification.onClick')(this.get('notification'));
    }
  },
  mouseEnter() {
    if (this.get('notification.autoClear')) {
      this.set('paused', true);
      this.notifications.pauseAutoClear(this.get('notification'));
    }
  },

  mouseLeave() {
    if (this.get('notification.autoClear')) {
      this.set('paused', false);
      this.notifications.setupAutoClear(this.get('notification'));
    }
  },

  processedType: computed('notification.type', function() {
    if (this.get('notification.type') && A(['info', 'success', 'warning', 'error']).includes(this.get('notification.type'))) {
      return this.get('notification.type');
    }
  }),

  // Apply the clear animation duration rule inline
  notificationClearDuration: computed('paused', 'notification.clearDuration', function() {
    const duration = Ember.Handlebars.Utils.escapeExpression(this.get('notification.clearDuration'));
    const playState = this.get('paused') ? 'paused' : 'running';
    return htmlSafe(`animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms; animation-play-state: ${playState}; -webkit-animation-play-state: ${playState}`);
  }),

  actions: {
    removeNotification() {
      this.notifications.removeNotification(this.get('notification'));
    }
  }
});
