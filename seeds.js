// var mongoose    =require('mongoose'),
//     Campground  =require('./models/campground');
//     var Comment =require('./models/comment');
//     var data        =[
//         {
//             name:'Solang Valley',
//             image:'https://ihplb.b-cdn.net/wp-content/uploads/2014/06/Camping-in-manali.jpg',
//             description:'One of the best camping sites in India, Manali Solang Valley is an ideal place for trekking due to the rough terrain and therefore adventure enthusiasts can find a lot to explore in the valley. There are beautiful plantations and fields in the valley and therefore sheltered camps in the open area are a good place to stay.'
//         },
//         {
//             name:'Pushkar',
//             image:'https://ihplb.b-cdn.net/wp-content/uploads/2014/06/camping-in-pushkar.jpg',
//             description:'One of the best tourist places in Rajasthan, Pushkar is home to many lakes, numerous Ghats and temples in Pushkar. It also houses the one and only Brahma temple in the world and a sought after destination for trekkers. Orchard Tents and tranquility feature 11 new and spacious luxury tents with air conditioning, bedrooms, living rooms, dressing rooms and verandahs. To complete the experience, a free camel cart service will bring you into Pushkar.'
//         },
//         {
//             name:'Anjuna Beach',
//             image:'https://ihplb.b-cdn.net/wp-content/uploads/2014/06/camping-at-anjuna-beach.jpg',
//             description:'Well-known for its beautiful and serene beaches, Anjuna is one of the best camping locations in Goa. It is a nice little place in Goa where people tend to camp to enjoy the scenes and lifestyle of Goa’s hippy culture. Beaches, chapels and flea markets can be explored at will while camping on the Goan landscape. The happening nightlife of Goa is something you must watch for'
//         }
//     ];
// function seedDB(){
//     Campground.deleteMany({},function(err){
//         if(err){
//             console.log(err);
//         }
// //             data.forEach(element => {
// //                 Campground.create(element,function(err,campground){
// //                     if(err){
// //                         console.log(err);
// //                     }
// //                     else{
// //                         //Create comment
// //                         Comment.create({
// //                             text:"Nyc Place Dear!",
// //                             username:"Narendra Modi"
// //                         },function(err,comment){
// //                             if(err){
// //                                 console.log(err);
// //                             }
// //                             else{
// //                                 campground.comments.push(comment);
// //                                 campground.save();
                                
// //                             }
// //                         });
// //                     }
// //                 });
// //             });

//         });
// };
//  module.exports=seedDB;
