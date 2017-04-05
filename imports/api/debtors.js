import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';
import moment from 'moment';

export const Debtors = new Mongo.Collection('debtors');

if (Meteor.isServer) {
  Meteor.publish('debtors', function () {
    return Debtors.find({ userId: this.userId });
  });
}

Meteor.methods({
  'debtors.insert'(){
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Debtors.insert({
      fname: '',
      middle: '',
      lname: '',
      phone: '',
      email: '',
      mailing: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
      debt: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    })
  },

  'debtors.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id});

    Debtors.remove({
      _id,
      userId: this.userId
    });
  },

  'debtors.update'(_id, updates){
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      fname: {
        label: "First Name",
        type: String,
        min: 1,
        max: 35,
        optional: true
      },
      middle: {
        type: String,
        min: 0,
        max: 1,
        optional: true,
      },
      lname: {
        type: String,
        min: 1,
        max: 35,
        optional: true
      },
      phone: {
        type: String,
        regEx: SimpleSchema.RegEx.Phone,
        optional: true
      },
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
      },
      mailing: {
        type: String,
        optional: true

      },
      apt: {
        type: String,
        min: 0,
        max: 12,
        optional: true
      },
      city: {
        type: String,
        min: 0,
        max: 25,
        optional: true
      },
      state: {
        type: String,
        min: 2,
        max: 15,
        optional: true
      },
      zip: {
        type: String,
        regEx: SimpleSchema.RegEx.ZipCode,
        optional: true
      },
      debt: {
        type: String,
        min: 1,
        max: 6,
        optional: true
      }
    }).validate({
       _id,
       ...updates
     });

    Debtors.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
       }
     }
    );
  }
});//meteor.methods

// 'debtors.insert'(email) {
//   if(!this.userId) {
//     throw new Meteor.Error('not-authorized');
//   }
//   new SimpleSchema({
//         email: {
//           label: "Email",
//           type: String,
//           regEx: SimpleSchema.RegEx.Email
//         }
//       }).validate({ email });
//
//   Debtors.insert({
//     _id: shortid.generate(),
//     email
//   });
// },

  // Meteor.methods({
  //   'links.insert'(url) {
  //     if (!this.userId) {
  //       throw new Meteor.Error('not-authorized');
  //     }
  //
  //     new SimpleSchema({
  //       url: {
  //         type: String,
  //         label: 'Your link',
  //         regEx: SimpleSchema.RegEx.Url
  //       }
  //     }).validate({ url });
  //
  //     Links.insert({
  //       _id: shortid.generate(),
  //       url,
  //       userId: this.userId,
  //       visible: true,
  //       visitedCount: 0,
  //       lastVisitedAt: null
  //     });
  //   },
  //   'links.setVisibility'(_id, visible) {
  //     if (!this.userId) {
  //       throw new Meteor.Error('not-authorized');
  //     }
  //
  //     new SimpleSchema({
  //       _id: {
  //         type: String,
  //         min: 1
  //       },
  //       visible: {
  //         type: Boolean
  //       }
  //     }).validate({ _id, visible });
  //
//   'links.trackVisit'(_id) {
//     new SimpleSchema({
//       _id: {
//         type: String,
//         min: 1
//       }
//     }).validate({ _id });
//
//     Links.update({ _id }, {
//       $set: {
//         lastVisitedAt: new Date().getTime()
//       },
//       $inc: {
//         visitedCount: 1
//       }
//     })
//   }
// });
