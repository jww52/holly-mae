import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import { Debtors } from './debtors';

if (Meteor.isServer) {
    describe('debtors', function() {
      const debtorOne = {
        _id: 'testDebtor1',
        fname: 'geo',
        middle: 'w',
        lname: 'hurcules',
        phone: '555-555-5555',
        email: 'test@debt.com',
        mailing: '55 street',
        apt: 'k',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76104',
        debt: '25000',
        userId: 'testUserId1',
        createdAt: 0
      };

      beforeEach(function() {
        Debtors.remove({});
        Debtors.insert(debtorOne);
      });


      it('should insert a new debtor', function (){
        const userId = 'testId';
        const _id = Meteor.server.method_handlers['debtors.insert'].apply({userId});

        expect(Debtors.findOne({ _id, userId })).toExist();
      });

      it('should not insert debtor if not authenticated', function () {
        expect(() => {
          Meteor.server.method_handlers['debtors.insert']();
        }).toThrow();
    });

      it('should remove debtor', function () {
        Meteor.server.method_handlers['debtors.remove'].apply({userId: debtorOne.userId}, [debtorOne._id]);

        expect(Debtors.findOne({_id: debtorOne._id})).toNotExist();
      });

      it('should not remove debtor if unauthenticated', function () {
        expect(() => {
          Meteor.server.method_handlers['debtor.remove'].apply({}, [debtor._id]);
        }).toThrow();
      });

      it('should not remove note if invalid _id', function() {
        expect(() => {
          Meteor.server.method_handlers['debtor.remove'].apply({userId: debtorOne.userId}, []);
        }).toThrow()
    });

      it('should update debtor', function () {
        const fname = 'Updated';

        Meteor.server.method_handlers['debtors.update'].apply({
          userId: debtorOne.userId
        }, [
        debtorOne._id,
          { fname }
        ]);

          const debtor = Debtors.findOne(debtorOne._id);
          expect(debtor.updatedAt).toBeGreaterThan(0);
          expect(debtorOne).toInclude({
            fname,
            ...debtorOne
          });
        });

        it('should not update the debtor with extra updates', function() {
        expect(() => {
          Meteor.server.method_handlers['debtors.update'].apply({
            userId: debtorOne.userId
          }, [
            debtorOne._id,
            {fname, attachment: "malicious@Body.com"}
          ]);
        }).toThrow();
      });

      it('should not updated debtor if user was not creator', function() {
        const email = 'updated@email.com';

        Meteor.server.method_handlers['debtors.update'].apply({
          userId: 'testId'
        }, [
          debtorOne._id,
          { email }
        ]);

          const debtor = Debtors.findOne(debtorOne._id);

          expect(debtor).toInclude(debtorOne);
        });

        it('should not update debtor if unauthenticated', function () {
          expect(() => {
            Meteor.server.method_handlers['debtors.update'].apply({}, [debtorOne._id]);
          }).toThrow();
          });

      it('should not update debtor if invalid _id', function() {
        expect(() => {
          Meteor.server.method_handlers['debtors.update'].apply({userId: debtorOne.userId}, []);
        }).toThrow()
      });

      it('should return a users debtor info', function () {
        const res = Meteor.server.publish_handlers.debtors.apply({userId: debtorOne.userId});
        //cursor needs to call fetch()
        const debtors = res.fetch();

        expect(debtors.length).toBe(1);
        expect(debtors[0]).toEqual(debtorOne);
      });

      it('should return zero info for user that has none', function () {
        const res = Meteor.server.publish_handlers.debtors.apply({userId: 'testId'});
        const debtors = res.fetch();

        expect(debtors.length).toBe(0);
      });
  });
}
