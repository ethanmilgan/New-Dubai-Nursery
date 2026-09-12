import {defineType, defineField} from 'sanity';
import {uniquePhoto, uniqueImageAsset} from './unique-photo.js';

const required = rule => rule.required();
const text = (name, title, extra = {}) => defineField({name, title, type: 'string', ...extra});
export const schemaTypes = [
  defineType({name: 'nurseryPhoto', title: 'Photo', type: 'document', fields: [
    text('title', 'Photo title', {validation: required}),
    defineField({name: 'image', title: 'Photograph', type: 'image', options: {hotspot: true}, validation: rule => rule.required().custom(uniqueImageAsset)}),
    text('alt', 'Describe the photograph', {description: 'Describe the activity for visitors who cannot see the image.', validation: required}),
    text('category', 'Learning area', {options: {list: ['Art and Craft', 'Communication and language', 'Events', 'Numeracy', 'Personal Social Emotional Development', 'Physical development', 'UOW']}}),
    defineField({name: 'suggestedPlacements', title: 'Suggested uses', type: 'array', of: [{type: 'string'}]}),
    text('sourceArchive', 'Original archive', {readOnly: true}),
    text('sourcePath', 'Original filename', {readOnly: true}),
    defineField({name: 'selectionReason', title: 'Selection notes', type: 'text', readOnly: true}),
  ], preview: {select: {title: 'title', subtitle: 'category', media: 'image'}}}),
  defineType({name: 'nurseryPage', title: 'Page', type: 'document', fields: [
    text('title', 'Page', {readOnly: true, validation: required}),
    text('slug', 'Page address', {readOnly: true, validation: required}),
    defineField({name: 'photos', title: 'Page photographs', description: 'Each position matches a named area of this page. Select a photo from the library.', type: 'array', options: {disableActions: ['add', 'remove', 'duplicate', 'copy']}, of: [{type: 'object', name: 'photoPosition', fields: [
      text('slot', 'Position key', {hidden: true, readOnly: true}),
      text('label', 'Position', {readOnly: true}),
      defineField({name: 'photo', title: 'Selected photo', type: 'reference', to: [{type: 'nurseryPhoto'}], validation: rule => rule.required().custom(uniquePhoto)}),
      text('caption', 'Caption', {description: 'Used on gallery cards.'}),
    ], preview: {select: {title: 'label', subtitle: 'photo.title', media: 'photo.image'}}}]}),
    defineField({name: 'copy', title: 'Page wording', description: 'Edit the text while retaining the page design. Entries follow their position on the page.', type: 'array', options: {disableActions: ['add', 'remove', 'duplicate', 'copy']}, of: [{name: 'copyEntry', type: 'object', fields: [
      text('key', 'Key', {hidden: true, readOnly: true}),
      text('label', 'Location / original wording', {readOnly: true}),
      defineField({name: 'value', title: 'Text', type: 'text', rows: 3, validation: required}),
    ], preview: {select: {title: 'label', subtitle: 'value'}}}]}),
  ]}),
  defineType({name: 'nurserySettings', title: 'Nursery details', type: 'document', fields: [
    ...['phone','whatsapp','email','instagram','address','addressShort'].map(name => text(name, {phone:'Telephone',whatsapp:'WhatsApp number',email:'Email',instagram:'Instagram handle',address:'Full address',addressShort:'Short address'}[name], {validation: required})),
    ...['instagramHref','mapsHref','mapsEmbedHref'].map(name => defineField({name, title: {instagramHref:'Instagram link',mapsHref:'Google Maps link',mapsEmbedHref:'Embedded map link'}[name], type:'url', validation: rule => rule.required().uri({scheme:['https']})})),
    defineField({name:'testimonials', title:'Parent testimonials', type:'array', validation: rule => rule.min(1), of:[{type:'object', name:'testimonial', fields:[text('name','Parent name',{validation:required}),text('role','Description'),defineField({name:'quote',title:'Quotation',type:'text',validation:required})], preview:{select:{title:'name',subtitle:'quote'}}}]}),
    defineField({name:'forms', title:'Admission forms', type:'array', of:[{type:'object',name:'admissionForm',fields:[text('name','Form name',{validation:required}),defineField({name:'document',title:'PDF file',type:'file',options:{accept:'.pdf'},validation:required})],preview:{select:{title:'name'}}}]}),
  ]}),
];
