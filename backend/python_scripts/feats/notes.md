<!---Could get feat name from <a> getText calls-->
-Need to be able to follow link and grab feat data from those anchors
-anchors attached to h2 id attributes. The h2 is the Feat Name.
 |- directly following the Feat Name (the next sibling of the h2 tag)
   is the Feat Description. This is always true.
 |-the next sibling of the Description is a p class="stat-block-1"
    regardless of whether it is a prereq, a benefit, a normal, or a special
 |-recommended approach: get desired anchored h2 tag, then call next
    sibling and store the data until you hit another h2 tag.
<!-- |-...wait... why not just have the list of sites with feats 
//      on them, and do
//    this without having to get the links from the index, break 
//      them apart, and map an array of anchors to an href. 
//      Why even worry about anchors?
-->
<b>Solved my issues:</b> if we get the href and the anchors, and we sort 
the anchors alphabetically, we can visit the pages and grab feats
as efficiently and as explicitly as possible.
It also gives me more knowledge of the pages, through the anchors.
It is also a more adaptable solution, as I could do the same for
any arbitrary list of links attached to anchors.
