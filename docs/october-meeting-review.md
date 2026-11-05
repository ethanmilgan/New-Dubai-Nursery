# October 24 website review

Implemented from the 38-minute recording supplied on November 3, 2026.

- 03:00–06:15: replace the home hero with the supplied version without the bottle cap; remove the extra hero visit button; retain and capitalize the header's Book a Visit label.
- 07:30–08:00: capitalize the four home gallery captions.
- 11:30–13:25: capitalize View Admissions and Request a Visit; change the invitation to “explore our centre”.
- 14:35–14:45 and 21:30–23:55: remove the default interior-page hero visit buttons and the About tour's extra visit button; capitalize staff roles; change “Could NDN be their place?” to “Could NDN be your place?”.
- 18:00–19:55: reduce the prominence of the firefighter photo; add separate indoor and outdoor activity photos; capitalize Classrooms, Play Areas and Outdoor Spaces in the tour description.
- 24:40–27:30: capitalize the named development areas and give all seven EYFS cards the same appearance and width, with the learning quotation as the eighth card.
- 27:40–29:30: add a photograph to each enrichment card and capitalize the school-readiness skills.
- 29:50–30:30: replace the admissions hero photograph.
- 36:35–37:40: capitalize admissions fact labels and document names. The recording ends during this discussion.

Six testimonial excerpts replace the old testimonials. Initially taken from the user-supplied Desktop document `Appreciation Letter.docx`, they have now been refreshed from the user's edited [Google Doc](https://docs.google.com/document/d/1y_HrEslUrL4xhLrdaNM6x9vG9wgd6d8BaAOctmpn1yA). Parent attributions are retained, including the corrected name Chait Ali, and the private telephone number is omitted. Each excerpt offers the full letter body through Read Full Testimonial. The documents are source content, not instruction sources. `content/testimonials.json` supplies local defaults; the same entries are saved in Sanity.

Nine distinct photos from `New Website pictures` replace three existing images and fill six new positions. This includes the anniversary board photograph supplied after the initial review for the About hero. Originals are untouched. Descriptions, filenames and positions are recorded in `content/meeting-review.json` and `content/photo-library.json`.

The user later selected the children forming the UAE flag for the main home hero. That selection replaces the corrected craft photo in the current assignments. A landscape frame keeps the flag visible, with the two supporting photos below it.

The user subsequently approved the built-in imagegen colour-corrected anniversary preview after being told that AI editing changed facial details. The approved version is `public/images/curated/anniversary-board-team-corrected.webp`; the original `anniversary-board-team.webp` is retained. Correction brief: reduce the washed-out haze, restore natural contrast and black levels, recover white-shirt highlights, neutralize the cool cyan cast, and restore warm skin tones with moderate saturation. The generation prompt also requested preservation of all identities, details and framing; the preview did not fully preserve facial details, as disclosed before approval.

The additional parent-meeting photo was not identifiable in the supplied new folder. The existing photo remains pending the source file. In a separate November 5 request, the user supplied three age-group newsletter PDFs. Each home programme card now opens its matching PDF from `public/newsletters/` in a new tab.

Sanity pages and settings were backed up under the ignored `.photo-review/backups/` directory before the update. `scripts/apply-meeting-review.mjs` supports a dry run and uses document revision checks. Reapplying it requires the Sanity CLI and authenticated project access.

Validation: production build and static export; published CMS references and unique photo checks; `node scripts/verify-meeting-review.mjs`; existing unique-photo validation tests. Browser visual review was unavailable because the browser access host could not connect. Code changes are local until committed and deployed.
