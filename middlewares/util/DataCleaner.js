var DataCleaner = (function() {
  return {
    strip: function(dataArr) {
      var savableData = [];

      // dataArr.forEach(function(data) {
      //   var savableObj = {},
      //     id = data.id;

      //   savableObj = {};
      //   savableObj.id = data.id;
      //   savableObj.type = data.type;
      //   savableObj.commentCount = data.comments.count;
      //   savableObj.likeCount = data.likes.count;
      //   savableObj.createdAt = data.created_time;
      //   savableObj.link = data.link;
      //   savableObj.caption = data.caption.text;
      //   savableObj.images = {
      //     lowRes: data.images.low_resolution.url,
      //     stdRes: data.images.standard_resolution.url
      //   };

      //   if ('videos' in data) {
      //     savableObj.videos = {
      //       lowRes: data.videos.low_resolution.url,
      //       stdRes: data.videos.standard_resolution.url
      //     };
      //   }

      //   savableData.push(savableObj);
      // });

      // format them into savable format and return

      savableData = [{
        id: '1230062364457213925_259220806',
        type: 'image',
        commentCount: 6433,
        likeCount: 66300,
        createdAt: '1460854882',
        link: 'https://www.instagram.com/p/BESDzQNDJ_l/',
        caption: 'I was that weird kid! #9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/11287831_1251155898246643_1583168569_n.jpg?ig_cache_key=MTIzMDA2MjM2NDQ1NzIxMzkyNQ%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/11287831_1251155898246643_1583168569_n.jpg?ig_cache_key=MTIzMDA2MjM2NDQ1NzIxMzkyNQ%3D%3D.2.l' } },
      { id: '1230001943276723525_259220806',
        type: 'image',
        commentCount: 3411,
        likeCount: 312617,
        createdAt: '1460847679',
        link: 'https://www.instagram.com/p/BER2EAmDJ1F/',
        caption: 'Hello. Wanna play with me? #9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12976218_486154221578995_1241118117_n.jpg?ig_cache_key=MTIzMDAwMTk0MzI3NjcyMzUyNQ%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12976218_486154221578995_1241118117_n.jpg?ig_cache_key=MTIzMDAwMTk0MzI3NjcyMzUyNQ%3D%3D.2.l' } },
      { id: '1229944065085972174_259220806',
        type: 'image',
        commentCount: 16969,
        likeCount: 344331,
        createdAt: '1460840779',
        link: 'https://www.instagram.com/p/BERo5xVDJ7O/',
        caption: 'I guess I\'ve screwed up very badly... #exam#9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12976183_941495245971886_2081417371_n.jpg?ig_cache_key=MTIyOTk0NDA2NTA4NTk3MjE3NA%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/12976183_941495245971886_2081417371_n.jpg?ig_cache_key=MTIyOTk0NDA2NTA4NTk3MjE3NA%3D%3D.2.l' } },
      { id: '1229881164165848686_259220806',
        type: 'image',
        commentCount: 10466,
        likeCount: 305088,
        createdAt: '1460833281',
        link: 'https://www.instagram.com/p/BERamcSDJ5u/',
        caption: 'Unicorn grilled cheese. Taste the rainbow! (Credit: @hkfoodiexblogger) #unicorn#rainbow#grilledcheese#9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12918459_224020167967032_1212873688_n.jpg?ig_cache_key=MTIyOTg4MTE2NDE2NTg0ODY4Ng%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12918459_224020167967032_1212873688_n.jpg?ig_cache_key=MTIyOTg4MTE2NDE2NTg0ODY4Ng%3D%3D.2.l' } },
      { id: '1229823266505137569_259220806',
        type: 'image',
        commentCount: 12164,
        likeCount: 533156,
        createdAt: '1460826379',
        link: 'https://www.instagram.com/p/BERNb64jJ2h/',
        caption: 'When someone knocks on your door at 11pm #knockknock#whosthere#9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/l/t51.2885-15/s320x320/e35/12328037_1022667004435667_1664715534_n.jpg?ig_cache_key=MTIyOTgyMzI2NjUwNTEzNzU2OQ%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/l/t51.2885-15/s480x480/e35/12328037_1022667004435667_1664715534_n.jpg?ig_cache_key=MTIyOTgyMzI2NjUwNTEzNzU2OQ%3D%3D.2.l' } },
      { id: '1229775274934836765_259220806',
        type: 'video',
        commentCount: 19636,
        likeCount: 426344,
        createdAt: '1460820658',
        link: 'https://www.instagram.com/p/BERChjQDJ4d/',
        caption: 'They look so adorable together#❤️ (credit: @luna.the.perfect.frenchie ) #9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e15/12725018_933400126779564_1274178814_n.jpg?ig_cache_key=MTIyOTc3NTI3NDkzNDgzNjc2NQ%3D%3D.2',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/e15/12725018_933400126779564_1274178814_n.jpg?ig_cache_key=MTIyOTc3NTI3NDkzNDgzNjc2NQ%3D%3D.2' },
        videos:
         { lowRes: 'https://scontent.cdninstagram.com/t50.2886-16/13045926_1734458316825814_1427029712_n.mp4',
           stdRes: 'https://scontent.cdninstagram.com/t50.2886-16/13045926_1734458316825814_1427029712_n.mp4' } },
      { id: '1229702461255359525_259220806',
        type: 'image',
        commentCount: 20123,
        likeCount: 559580,
        createdAt: '1460811978',
        link: 'https://www.instagram.com/p/BEQx9-OjJwl/',
        caption: 'I\'ll admit, this is me! #no#data#life #9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12328389_1109065705790516_1041402660_n.jpg?ig_cache_key=MTIyOTcwMjQ2MTI1NTM1OTUyNQ%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/12328389_1109065705790516_1041402660_n.jpg?ig_cache_key=MTIyOTcwMjQ2MTI1NTM1OTUyNQ%3D%3D.2.l' } },
      { id: '1229642067312680075_259220806',
        type: 'image',
        commentCount: 30543,
        likeCount: 630031,
        createdAt: '1460804778',
        link: 'https://www.instagram.com/p/BEQkPH_DJyL/',
        caption: 'This kid is going places! #9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12446275_489761934554749_617024374_n.jpg?ig_cache_key=MTIyOTY0MjA2NzMxMjY4MDA3NQ%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/12446275_489761934554749_617024374_n.jpg?ig_cache_key=MTIyOTY0MjA2NzMxMjY4MDA3NQ%3D%3D.2.l' } },
      { id: '1229581669234417400_259220806',
        type: 'image',
        commentCount: 9005,
        likeCount: 690636,
        createdAt: '1460797578',
        link: 'https://www.instagram.com/p/BEQWgN5DJ74/',
        caption: 'Why can\'t I be this happy? #puppy#playtime#9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12905136_1718835651719841_48802695_n.jpg?ig_cache_key=MTIyOTU4MTY2OTIzNDQxNzQwMA%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12905136_1718835651719841_48802695_n.jpg?ig_cache_key=MTIyOTU4MTY2OTIzNDQxNzQwMA%3D%3D.2.l' } },
      { id: '1229518753651006851_259220806',
        type: 'image',
        commentCount: 5512,
        likeCount: 478690,
        createdAt: '1460790078',
        link: 'https://www.instagram.com/p/BEQIMrMDJ2D/',
        caption: 'Every single time #showerthought#9gag @9gagmobile',
        images:
         { lowRes: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12445899_914681118651561_1640662600_n.jpg?ig_cache_key=MTIyOTUxODc1MzY1MTAwNjg1MQ%3D%3D.2.l',
           stdRes: 'https://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/12445899_914681118651561_1640662600_n.jpg?ig_cache_key=MTIyOTUxODc1MzY1MTAwNjg1MQ%3D%3D.2.l' }
      }];

      console.log('savable data length ', savableData.length);

      return savableData;
    }
  };
})();

module.exports = DataCleaner;
