import test from 'node:test';
import assert from 'node:assert/strict';
import {centreWording,brandMentions,hasGenericNursery} from '../lib/centre-wording.mjs';

test('preserves the nursery name while changing generic mentions in the same sentence',()=>{
 const before='New Dubai Nursery is a nursery. Visit New Dubai Nursery for a nursery tour.';
 const after=centreWording(before);
 assert.equal(after,'New Dubai Nursery is an early childhood centre. Visit New Dubai Nursery for an early childhood centre tour.');
 assert.deepEqual(brandMentions(after),brandMentions(before));
 assert.equal(hasGenericNursery(after),false);
});
test('updates headings, articles, possessives and team references',()=>{
 assert.equal(centreWording('A Nursery with Heart'),'An Early Childhood Centre with Heart');
 assert.equal(centreWording('The nursery team and the nursery’s forms'),'The early childhood centre team and the early childhood centre’s forms');
 assert.equal(centreWording('NURSERY TOUR'),'EARLY CHILDHOOD CENTRE TOUR');
});
test('keeps sentences grammatical and repeated migrations unchanged',()=>{
 for(const text of ['Starting nursery is a big moment.','Whether you are exploring nursery for the first time.','We are happy at nursery.','Nursery life','My child is attending nursery.','When she started nursery.']){
  const after=centreWording(text);assert.equal(centreWording(after),after);assert.equal(hasGenericNursery(after),false);
 }
 assert.equal(centreWording('Starting nursery is a big moment.'),'Starting at an early childhood centre is a big moment.');
 assert.equal(centreWording('When she started nursery.'),'When she started at the early childhood centre.');
});
