(function() {
  var global = window,
      curPlayer,
      fieldPanel = $('#field_panel'),
      popupInner = $('#popup_inner'),
      homePopup = $('#home_popup'),
      depthChart =  $('#depth_chart'),
      container = $('#container'),
      popupHeading = $('#popup_heading'),
      statIcon = '<button id="stat_icon"><div class="icon-table"></div><br>Show<br>player stats</button>',
      backButton = '<button id="back_button"><div class="icon-back"></div><br>Back to<br>players</button>',
      timeout = 'setTimeout';
    (function(){
      // Scrollbar
      global[timeout](function(){
        fieldPanel.addClass("hide-instructions");
        global[timeout](function() {
          fieldPanel.addClass("hide-before");
        },1010);
      }, 2000);
      Ps.initialize(document.getElementById('synopsis_panel'));
      // Align player images on field & synopsis panel splash image padding
      global[timeout](function(){
        synopsisPadding();
        alignPlayers();
      }, 300);
      global.addEventListener("resize", function() {
        alignPlayers();
        synopsisPadding();
      });
      // Exit on click x icon or outside
      $('#cross-close, #popup_overlay').bind('click', function(){
        Popup.close();
      });
      // Show popup when position clicked
      fieldPanel.find('.player-span').bind('click', function(){
        Popup.fill(this.id);
        Popup.show();
      });
    })();

  function alignPlayers(){
    var fieldImage = $('#field_image');
    var winHeight = $(global).height();
    var height = fieldImage.height();
    var width = fieldImage.width();
    $('#pitcher_image').css('margin-top', height/10 + 'px');
    $('#catcher_image').css('margin-top', height/2.56 + 'px');
    $('#first_image').css('margin', height/19 + 'px 0 0 ' + width/3.7 + 'px');
    $('#second_image').css('margin', height/-8.4 + 'px 0 0 ' + width/9 + 'px');
    $('#shortstop_image').css('margin', height/-8.4 + 'px 0 0 ' + width/-7.2 + 'px');
    $('#third_image').css('margin', height/19 + 'px 0 0 ' + width/-3.5 + 'px');
    $('#lf_image').css('margin', height/-4.45 + 'px 0 0 ' + width/-3.2 + 'px');
    $('#cf_image').css('margin-top', height/-2.8 + 'px');
    $('#rf_image').css('margin', height/-4.45 + 'px 0 0 ' + width/3.5 + 'px');
    $('#dp_image').css('margin', height/3 + 'px 0 0 ' + width/3.2 + 'px');
    $('#bm_image').css('margin', height/3 + 'px 0 0 ' + width/-3.2 + 'px');
    fieldPanel.find('.player-span').css({'width': width/10 + 'px', 'height': width/8 + 'px', 'font-size': width/55 + 'px'});
    popupInner.css('max-height', winHeight * 0.97 - 58 + 'px');
    homePopup.css('max-height', winHeight * 0.97 + 'px');
    $('#pizza_button').css({'width': width/14 + 'px', 'height': width/14 + 'px'});
  }

  function synopsisPadding(){
    var padding = $('#splash_image').height();
    $('#synopsis_panel').css('padding-top', padding/1.1 + 'px');
  }

  var Popup = {
    show: function(){
      container.addClass('show-popup-display');
      global[timeout](function(){
        container.addClass('show-popup-fadein');
      }, 100);
      global[timeout](function(){
        Ps.initialize(popupInner[0], {swipePropagation: false});
        popupInner[0].scrollTop = 0;
      }, 105);
    },

    close: function(){
      container.removeClass('show-popup-fadein');
      global[timeout](function(){
        container.removeClass('show-popup-display');
        Ps.destroy(popupInner[0]);
        depthChart.removeClass('player-card-first').html('');
        popupInner.removeClass('change-background-color');
        $('#pu-info').show();
      }, 400);
    },

    backButton: function(elem){
      // console.log(elem);
      elem.removeClass('player-card-animate-heading player-card-third');
      var playerInfo = $('#player_info');
      var controls = $('#controls');
      global[timeout](function(){
        if (popupInner.scrollTop() > 0)
          popupInner.animate({scrollTop:0}, '300', 'swing');
        controls.css('transform', 'translate3d(0,200px,0)');
        playerInfo.slideUp(900, function(){
          Popup.changeTitle(lastHeading);
        });
        global[timeout](function(){
          elem.slideUp(650, function(){
            depthChart.detach().removeClass('player-card-first');
            depthChart.find(playerInfo)[0].outerHTML = '';
            depthChart.find(controls)[0].outerHTML = '';
            elem.css({height: ''}).removeClass('player-card-second').bind('click', function(){
              Players.show($(this));
            });
            popupInner.removeClass('change-background-color').append(depthChart);
            $('#pu-info, .chart-player').slideDown(500, function(){
              Popup.updateScroll();
            });
          });
        }, 950);
      }, 50);
    },

    showIframe: function(elem){
      var height = elem.width() / 1.778;
      var url = elem.attr('url');
      elem.animate({height: height + 'px'});
      if (url.slice(0,2) == '22') // test if mgoblue
        elem.addClass('hide-before').html('<iframe src="http://www.mgoblue.com/vp/single-player/v2/?j=%7B%22element%22%3A%22null%22%2C%22debug%22%3A%22false%22%2C%22code_ver%22%3A%222%22%2C%22embed_player%22%3A%22http%3A%2F%2Fwww.mgoblue.com%2Fvp%2Fsingle-player%2Fv2%2F%22%2C%22aspect%22%3A%2216x9%22%2C%22player_width%22%3A%22100%25%22%2C%22maxWidth%22%3A%22false%22%2C%22width%22%3A%22100%22%2C%22partner%22%3A%22mich%22%2C%22mediaid%22%3A%' + url + '%22%2C%22school%22%3A%22mich%22%7D"></iframe>').unbind('click');
      else
        elem.addClass('hide-before').html('<iframe src="https://www.youtube.com/embed/' + url + '" allowfullscreen></iframe>').unbind('click');
    },

    updateScroll: function(){
      var popup = popupInner[0];
      popup.scrollTop = 0;
      Ps.update(popup);
    },

    changeTitle: function(title){
      popupHeading.addClass('fade-out');
      global[timeout](function(){
        popupHeading.text(title);
        popupHeading.removeClass('fade-out');
      }, 600);
    },

    fill: function(id){
      var headingText, players, playersLength;
      var playerHTML = '';
      var subheading = 'Possible Depth Chart';
      switch (id) {
        case 'catcher_image':
          headingText = 'Catcher';
          players = Positions.catcher;
          break;
        case 'pitcher_image':
          headingText = 'Pitcher';
          players = Positions.pitcher;
          break;
        case 'first_image':
          headingText = 'First Base';
          players = Positions.first;
          break;
        case 'second_image':
          headingText = 'Second Base';
          players = Positions.second;
          break;
        case 'shortstop_image':
          headingText = 'Shortstop';
          players = Positions.shortstop;
          break;
        case 'third_image':
          headingText = 'Third Base';
          players = Positions.third;
          break;
        case 'lf_image':
          headingText = 'Left Field';
          players = Positions.lf;
          break;
        case 'cf_image':
          headingText = 'Center Field';
          players = Positions.cf;
          break;
        case 'rf_image':
          headingText = 'Right Field';
          players = Positions.rf;
          break;
        case 'dp_image':
          headingText = 'DP';
          players = Positions.dp;
          break;
        case 'bm_image':
          headingText = 'Bench Mob';
          players = Positions.bm;
          break;
      }

      playersLength = players.length;

      if (id == 'bm_image')
        subheading = 'Alphabetical Order';

      popupHeading.text(headingText + ' | ' + subheading);

      for (var u = 0; u < playersLength; u++){
        var plr = players[u];
        playerHTML += '<button class="chart-player" name="' + plr.name.replace(' ', '') + '" style="background-image:url(https://res.cloudinary.com/henrygd/image/upload/v1443637531/softball/' + plr.image + ')"><h2><span>' + (u + 1) + '</span>' + plr.name + '</h2><span> ' + plr.year + '</span></button>';
      }

      depthChart.append(playerHTML);

      global[timeout](function(){
        depthChart.find('.chart-player').bind('click', function(){
          Players.show($(this));
        });
      }, 200);

    }
  };

  var Players = {
    show: function(elem){
      lastHeading = $('#pu-head h2').text();
      curPlayer = Players[elem.attr('name')];
      var cardOrig = homePopup.find('.chart-player, #pu-info');
      var orientation = $(global).height() > $(global).width() ? 'portrait' : 'landscape';
      global[timeout](function(){
        if (popupInner.scrollTop() > 0)
          popupInner.animate({scrollTop:0}, '200', 'swing');
        cardOrig.slideUp(600);
        Popup.changeTitle(curPlayer.name + ' - ' + curPlayer.positions.join(' / '));
        global[timeout](function(){
          depthChart.detach();
          elem.unbind('click').css({'height':'0px', 'display':'flex'}).append('<div id="controls">' + backButton + '</div>');
          depthChart.addClass('player-card-first').append('<div class="pu-info" id="player_info">' + curPlayer.info + '<p class="prediction"><strong>Prediction for 2016</strong>' + curPlayer.prediction + '</p>' + Players.video() +  '</div>');
          popupInner.addClass('change-background-color').append(depthChart);
          // if (orientation === 'landscape')
            elem.animate({height: (orientation === 'landscape' ? '380px' : '45vh')}, 602);
          // else
            // elem.animate({height: '50vw'}, 602);
          global[timeout](function(){
            elem.addClass('player-card-animate-heading');
          }, 1100);
          global[timeout](function(){
            elem.addClass('player-card-second');
            $('#player_info').slideDown(1200, function(){
              global[timeout](function(){
                if (typeof(curPlayer.stats) != 'undefined'){
                  $('#controls').append(statIcon).find('#stat_icon').bind('click', function(){
                    Players.showStats();
                  });
                }
                elem.addClass('player-card-third');
                $('#back_button').bind('click', function(){
                  Popup.backButton(elem);
                });
                depthChart.find('.vid-holder').bind('click', function(){
                  Popup.showIframe($(this));
                });
                Ps.update(popupInner[0]);
              }, 50);
            });
          }, 600);
        }, 605);
      }, 50);
    },

    showStats: function(){
      var stats = depthChart.find('.stats');
      if (stats.length){
        stats.slideUp(250, function(){
          stats.remove();
          Ps.update(popupInner[0]);
        });
      }
      else {
        if (typeof(curPlayer.stats.batting) != "undefined")
          Players.createTable('BATTING');
        if (typeof(curPlayer.stats.pitching) != "undefined")
          Players.createTable('PITCHING');
      }
    },

    createTable: function(heading){
      var container = $('#player_info');
      var stats = '';
      var headHTML = '';
      var cat, stat;
      if (heading == 'BATTING'){
        cat = ['Season','avg','gp-gs','ab','r','h','2b','3b','hr','rbi','tb','slg%','bb','hbp','so','gdp','ob%','sf','sh','sb-att'];
        stat = curPlayer.stats.batting;
      }
      else {
        cat = ['Season','era','w-l','app-gs','cg','sho','sv','ip','h','r','er','bb','so','2b','3b','hr','ab','b/avg','wp','hbp','bk','sfa','sha'];
        stat = curPlayer.stats.pitching;
      }
      var statLength = stat.length;
      var catLength = cat.length;
      if (container.width() > 600 && $(global).height() < $(global).width()){
        for (var i = 0; i < statLength; i++){
          stats += '<tr>';
          for (var q = 0; q < stat[i].length; q++){
            stats += '<td>' + stat[i][q] + '</td>';
          }
          stats += '</tr>';
        }
        for (var w = 0; w < catLength; w++){
          headHTML += '<th>' + cat[w] + '</th>';
        }
        container.prepend('<div class="stats"><table><caption>' + heading + '</caption><thead><tr>' + headHTML + '</tr></thead><tbody>' + stats + '</tbody></table></div>');
      }
      else {
        container.prepend('<div class="stats"><table id="' + heading + '"><caption>' + heading + '</caption><tbody>');
        for (var o = 1; o < catLength; o++){
          headHTML += '<tr><td colspan="2" class="t-subhead">' + cat[o] + '</td></tr><tr>';
          for (var t = 0; t < statLength; t++){
            headHTML += '<td>' + stat[t][0] + '</td><td>' + stat[t][o] + '</td></tr>';
          }
        }
        $('#' + heading).append(headHTML + '</tbody></table></div>');
      }
      global[timeout](function(){
        container.find('table').css('transform', 'scale3d(1,1,1');
      }, 30);
    },

    video: function(){
      var code = '';
      if (typeof(curPlayer.videos) == "undefined")
       return code;
      var videosLength = curPlayer.videos.length;
      for (var i = 0; i < videosLength; i++){
        if (curPlayer.videos[i][2] != 'mgoblue')
          code += "<div class='vid-holder' url='" + curPlayer.videos[i][0] + '?autoplay=1&showinfo=0&autohide=1&rel=0&iv_load_policy=3' + (typeof(curPlayer.videos[i][2]) == 'undefined' ? '' : curPlayer.videos[i][2]) + "' style='background-image:url(https://i.ytimg.com/vi/" + curPlayer.videos[i][0] + "/sddefault.jpg)'><div class='play'></div><h3>" + curPlayer.videos[i][1] + "</h3></div>";
        else
          code += "<div class='vid-holder' url='" + curPlayer.videos[i][0] + "' style='background-image:url(https://res.cloudinary.com/henrygd/image/upload/v1443637531/softball/" + curPlayer.image + ")'><div class='play'></div><h3>" + curPlayer.videos[i][1] + "</h3></div>";
      }
      return code;
    },

    AbbyRamirez: {
      name: 'Abby Ramirez',
      image: 'abby_profile.jpg',
      year: 'Junior',
      positions: ['SS', '2B'],
      stats: {batting: [['2014','.289','61 - 61','152','34','44','2','2','0','4','50','.329','11','1','17','0','.341','0','9','8 - 10'],['2015','.371','68 - 68','170','53','63','8','2','2','24','81','.476','17','6','18','0','.446','0','5','5 - 8'],['TOTAL','.332','129 - 129','322','87','107','10','4','2','28','131','.407','28','7','35','0','.398','0','14','13 - 18']]},
      info: "<p>Ramirez, known to all Michigan fans as a small lefty slapper, set Illinois high school home run records as a right handed power hitter. Is this relevant? Not really, she won't be doing that any time soon. But it is awesome.</p><p>Anyway, since she began focusing on slapping full time, Ramirez has shown steady and consistent improvement. She's not the fastest compared to other slappers, but she's quick out of the box and seems to sometimes get on base through sheer willpower alone. Defensively, she's solid all around.</p><blockquote>She's a real blue-collar kid. … Humility is a great quality to have, and she is an important cog in our wheel. I expect her to keep going forward and for her trajectory to be steeper and steeper.<em><a href='http://www.chicagotribune.com/suburbs/elmwood-park/sports/ct-oak-softball-trinity-abby-ramirez-michigan--tl-0702-20150629-story.html'>&#8212; Hutch</a></em></blockquote>",
      prediction: "Abby has started just about every game during her time at Michigan and has shown noticeable improvement, so I don't think there's much chance of her losing her spot. Her biggest competition may be Freshman Natalie Peters, a fellow slapper who played shortstop in high school and is probably a bit faster around the bases, but Ramirez has experience on her side and is a known quantity defensively."
    },
    AidanFalk: {
      name: 'Aidan Falk',
      image: 'falk_profile.jpg',
      year: 'Sophomore',
      positions: ['C', '1B'],
      stats: {batting: [['2015','.344','56 - 48','131','24','45','2','0','8','37','71','.542','17','1','30','2','.417','2','0','0 - 0'],['TOTAL','.344','56 - 48','131','24','45','2','0','8','37','71','.542','17','1','30','2','.417','2','0','0 - 0']]},
      info: "<p>Falk came to Michigan last season with a fair bit of hype after setting all time state home run records in New York. But the Rochester area is not exactly a traditional softball hotbed, and the transition to high level college pitching may have been particularly jarring for her. By around midseason, however, she earned the starting DP position, and was a productive bat the lineup throughout most of the twenty-eight game winning streak.</p><p><a href='http://www.flosoftball.com/2015/01/06/3-story-2014-aidan-falk-sisters-greatest-gift-16/'>Here's a good personal story on Falk's family and her sister Emma's illness, if you're interested in that.</a> Also a related video below.</p>",
      prediction: "With Alex Sobczak poised to take over at catcher and Tera Blanco concentrating more on pitching, Falk taking over at 1B seems a pretty good bet. Or Blanco may continue to play there anyway, ala Ally Carda, and push Falk to DP. At this point it's probably not been decided, but Falk should have a starting spot somewhere based on the quality of her bat.",
      videos: [['YLSn2UqVVG4', 'Video on Aidan\'s sister Emma']]
    },
    AlexSobczak: {
      name: 'Alex Sobczak',
      image: 'sobczak_profile.jpg',
      year: 'Freshman',
      from: 'Monroe, MI',
      positions: ['C', '3B'],
      info: "<p>Sobczak, who played at Mercy High School in Farmington Hills, MI (Northwest Metro Detroit), is, along with former Michigan All-American and current US national team member Amanda Chidester, one of the best offensive prospects in state history. She is a power hitter who slugged 17 home runs as a Sophomore, within one of the state record, and has since received what her high school coaches refer to as the Barry Bonds treatment -- lots of walks and almost nothing to hit. Despite this, she managed to bat .524 with 40 home runs, 40 doubles, 14 triples, and 151 RBI over her four year career. She committed to Michigan when she was fourteen.</p><p>Sobczak played travel ball with Finesse -- whose alums include Chiddy and other Wolverines like Roya St. Clair, Caitlin Blanchard, Taylor Hasselbach, Kelsey Susalla, and Aidan Falk -- and the coach of that team has called Sobczak the best hitter to ever play in the program. She was ranked in the 50-60 range nationally by the most popular softball recruiting website, which I think is far too low. In recent years there's been only one recruit I've been comparably excited about, and her name starts with an 'R' and ends with an 'O'.</p><blockquote>I hate to use the clichés, but they are so true with this kid. Her desire, the dedication, her work ethic, the expectations she has in herself. The competitiveness is so strong. She hates to fail. Every achievement she reaches, she instantly starts looking for the next one. That’s a quality you don’t find in too many athletes.<em><a href='http://www.candgnews.com/sports/sobczak-enjoying-brilliant-senior-season-while-anchoring-mercy-softball-team-83619'>&#8212; Mercy coach Alec Lesko</a></em></blockquote><blockquote>I'm super excited to be starting my journey. I'm pushing myself to be a better athlete. It was a thrill to watch them in the NCAA Tournament, the national championship series. I was staring at the TV and felt like I was right there with them.<em><a href='http://www.detroitnews.com/story/sports/high-school/2015/06/19/sobczak-named-miss-softball/28992737/'>&#8212; Alex Sobczak on Michigan</a></em></blockquote>",
      prediction: "Sobczak will start at catcher from the first game of the season through to the World Series final, and she will be damn good. There's no question she can match outgoing catcher Lauren Sweet's offensive production, in my opinion, but Sweet's defensive ability and leadership will be more difficult to replace. That's not a knock on Sobczak -- there are just some things you'd expect a player with 200+ college starts to do better than an incoming freshman who played primarily at a different position in high school, no matter how talented the latter is. As far as leadership goes, Sweet was simply fantastic and that's where my reasoning begins and ends. The good news in this case is that Sobczak seems to be accomplished in this area as well.",
      videos: [['zgp77YZD780', 'Sobczak named Michigan\'s Miss Softball'], ['kanxxh_JHLo', 'Sobczak hits two homers in a game during her junior season'], ['jMMboXDrwbU', 'Highlights from Mercy\'s 2015 postseason win over Clarkston, featuring an interview with Sobczak']]
    },
    MeganBetsa: {
      name: 'Megan Betsa',
      image: 'betsa_profile.jpg',
      year: 'Junior',
      stats: {pitching: [['2014','2.15','18 - 4','31 - 23','12','5','0','130.1','88','48','40','67','150','10','2','17','463','.190','9','16','0','2','8'],['2015','1.72','31 - 5','46 - 38','24','11','4','211.1','127','63','52','104','333','17','2','19','756','.168','8','25','0','2','7'],['TOTAL','1.88','49 - 9','77 - 61','36','16','4','341.2','215','111','92','171','483','27','4','36','1219','.176','17','41','0','4','15']]},
      positions: ['RHP'],
      info: "<p>If you watched any games last season, you know what you're going to get from Megan Betsa. She's a strikeout pitcher who works up and down with a great riseball and changeup. She was named pitcher of the year in the Big Ten and second team All-American. Prior to WCWS, she was hovering around a 1.4 ERA. She had a few rough outings in OKC, but stepped in midway through the deciding third game of the championship series against UF for Haylie Wagner and did very well, so that experience on the biggest stage should benefit her this season.</p>",
      prediction: "Betsa should be in the conversation for best pitcher in the country, and will likely remain the go-to ace on the staff. If she doesn't, that's probably a good thing anyway, because it means Driesenga or Blanco is will be completely dominant.",
      videos: [['22495085', 'Betsa tosses a no-hitter against MSU', 'mgoblue']]
    },
    KelseySusalla: {
      name: 'Kelsey Susalla',
      image: 'susalla_profile.jpg',
      year: 'Senior',
      positions: ['OF'],
      info: "<p>There were two open spots in the outfield heading into the 2015 season and Susalla was definitely not going to get one. Christner would take one and a Freshman would get the other. Susalla didn't work there. She was a walk-on who'd never played an inning in her life in the outfield, and filled a role mainly as a pinch hitter through her first two seasons at Michigan. Solid at the plate, potentially a good DP, but not an outfielder. That's what I thought. Susalla had a different idea.</p><p>During her face-to-face meeting with Hutch following the 2014 season, in a move at odds with her admittedly shy personality, Susalla told her coach that she wanted a chance in the outfield. She then chose to stay in Ann Arbor during the summer, fielding fly balls and practicing her long throws. Her teammates described her as perhaps the team's hardest worker -- she’s honestly one of the most hard-working people I’ve ever met, <a href='http://www.michigandaily.com/sports/kelsey-susalla-position-gave-her-identity'>said Megan Betsa</a> -- showing up early and putting in extra hours. When the new season rolled around, that work paid off.</p><p>Like fellow outfielder Kelly Christner, Susalla's 2015 season was one of the most surprising breakout performances in recent memory. She was simply rock solid throughout, at the plate and in the field, often providing the clutch hit or defensive play the team needed to take or hold the lead. She was really, really, <i>really</i> good, and capped off her season by making NCAA All-Tournament Team.</p><blockquote>I just wanted to do what I could to help the team. Since we were losing a couple outfielders and I had a pretty good bat, I knew I could help out. Hutch said to give it a try in the summer, see how it goes. She liked the outcome.<em><a href='http://www.detroitnews.com/story/sports/college/university-michigan/2015/05/20/players-pitch-switch-outfield-correct-call/27673995'>&#8212; Kelsey Susalla</a></em></blockquote><blockquote>Her teammates see how hard she works. She is the example of how to commit to the program and commit to the process and work at it every single day. ... You can watch her confidence grow. It's palpable. Her success has become the team's success.<em><a href='http://www.detroitnews.com/story/sports/college/university-michigan/2015/05/20/players-pitch-switch-outfield-correct-call/27673995/'>&#8212; Bonnie Tholl</a></em></blockquote><blockquote>I have been Kelsey's biggest fan all year. I've watched her just work hard every day. We gave her what I think is the most prestigious award we give out at the end of the season, our Maize and Blue award, which is basically the coach's award. A kid who comes in every day and makes the coach happy with her work ethic, with her desire to just help Michigan be great. I can't say enough about her.<em><a href='http://www.detroitnews.com/story/sports/college/university-michigan/2015/05/20/players-pitch-switch-outfield-correct-call/27673995/'>&#8212; Hutch</a></em></blockquote>",
      prediction: "I've written quite a few of these 2016 player predictions now and I'm kind of regretting choosing this format. When you have so many returning players who have locked up their position and are All-American level good, what more can I really say about them? I expect Kelsey Susalla to continue to be All-American level good. She will get a lot more scholarship money next season, and she deserves it.",
      videos: [['22490658', "Susalla's HR robbing catch at Bama named MGoBlue's #1 play of February", 'mgoblue'],['22497889', 'Susalla goes 4-4 in a comeback WCWS victory over UCLA', 'mgoblue']],
      stats: {batting: [['2013', '.315', '36 - 9', '54', '12', '17', '3', '1', '5', '24', '37', '.685', '7', '0', '13', '0', '.393', '0', '0', '0 - 0'],['2014', '.347', '34 - 11', '49', '6', '17', '4', '0', '0', '9', '21', '.429', '5', '3', '12', '1', '.439', '0', '0', '0 - 0'],['2015', '.380', '65 - 65', '184', '45', '70', '14', '2', '14', '61', '130', '.707', '27', '10', '36', '0', '.480', '2', '0', '4 - 4'],['TOTAL', '.362', '135 - 85', '287', '63', '104', '21', '3', '19', '94', '188', '.655', '39', '13', '61', '1', '.457', '2', '0', '4 - 4']]}
    },
    AmandaVargas: {
      name: 'Amanda Vargas',
      image: 'vargas_profile.jpeg',
      year: 'Sophomore',
      positions: ['IF'],
      stats: {batting: [['2015','.308','32 - 11','52','13','16','3','0','4','17','31','.596','6','2','3','0','.400','0','0','0 - 0'],['TOTAL','.308','32 - 11','52','13','16','3','0','4','17','31','.596','6','2','3','0','.400','0','0','0 - 0']]},
      info: "<p>Vargas, nicknamed Panda, showed promising potential at the plate during her freshman season. She got quite a few starts at DP early in the year and did well, but Aidan Falk was a bit better and eventually earned the spot. Vargas did get more looks as a replacement as the year progressed and had bright moments, like a grand slam against Ohio State.</p><p>Interestingly, Hutch put Vargas in as a pinch hitter in the late stages of the last game of the season, the rubber match against Florida for the championship, when nothing was going right at the plate, and she calmly drilled the ball into the outfield for a hit. That's impressive on its own, but the fact that Hutch chose her to send out in that situation in the first place speaks to the confidence she had in Vargas right up until the last game, despite her lack of playing, and bodes well for her prospects in the future.</p>",
      prediction: "The problem Vargas and others have is that with so many returning starters there isn't a lot of open real estate to compete for. Vargas will likely get a few starts at DP early in the season in a sort of rotation, and will get time in the field as a replacement against mismatched opponents. She will need to take advantage of that to earn a regular role.",
    },
    LindsayMontemarano: {
      name: 'Lindsay Montemarano',
      image: 'monty_profile.jpg',
      year: 'Junior',
      positions: ['3B'],
      info: '<p>Montemarano, or Monty, is a very good defensive player and brings a lot of confidence and charisma on the field and off. She has a powerful arm and generally hoovers up everything in sight at third without any trouble. The knock on Monty is that she has been a fairly average hitter during her time at Michigan. She improved a lot during the second half of the 2015 season, being more aggressive, fouling off a ton of pitches, and working a ton of walks. But she is not the fastest, or the most powerful, so there will be competition for her spot.</p>',
      prediction: "Third base is the position I'm most unsure of going into the season. Monty started last season as the clear favorite, but struggled at the plate and split time with Freshman Taylor Swearingen during the first half of the season. Swearingen brings power and speed, but may not be as good defensively. If Monty earns the spot, one possible option is flexing her when Blanco pitches, allowing Swearingen to hit while Monty still plays at third. I'd breakdown each player's chances of winning the spot at something like 46% Monty, 44% Swearingen, 5% Canfield, 5% Sobczak.",
      stats: {batting: [['2014','.226','60 - 59','115','18','26','6','0','5','14','47','.409','18','1','17','1','.331','2','2','0 - 0'],['2015','.242','60 - 56','132','33','32','11','0','3','22','52','.394','42','2','22','1','.427','2','7','4 - 4'],['TOTAL','.235','120 - 115','247','51','58','17','0','8','36','99','.401','60','3','39','2','.385','4','9','4 - 4']]},
      videos: [['22494913', 'MGoBlue profile', 'mgoblue']]
    },
    KellyChristner: {
      name: 'Kelly Christner',
      image: 'christner_profile.jpg',
      year: 'Junior',
      positions: ['OF'],
      info: '<p>In 2014, Christner was a promising but unremarkable part-time playing Freshman, hitting .299 with 3 home runs and 17 RBI in 77 at-bats. Fans penciled her in as a starter in 2015 almost by default -- two outfield spots were open after all -- and hoped there wouldn\'t be a major dropoff from the production of the much-loved departing Senior slappers, Lyndsay Doyle and Nicole Sappingfield.</p><p>A year later, Christner started all 68 games, hit .393 with 21 homers and 67 RBI in 214 at-bats, made some crazy diving catches, and became the first Michigan outfielder to be named a first team All-American since Patti Townsend in 1993.</p><blockquote>We scouted them, and their outfielders play right up against the wall. So our game plan was to try to hit line drives and gappers to drop into the outfield. I guess I failed at that.<em><a href="http://www.michigandaily.com/sports/same-thing-different-day-kelly-christner">&#8212; Kelly Christner, on her home run against MSU</a></em></blockquote>',
      prediction: "She will start in the outfield and hit the ball really hard. I'm pretty confident on this one.",
      stats: {batting: [['2014','.299','51 - 19','77','17','23','4','1','3','17','38','.494','6','3','22','0','.368','1','2','0 - 1'],['2015','.393','68 - 68','214','75','84','13','3','21','67','166','.776','34','6','35','2','.484','2','1','10 - 12'],['TOTAL','.368','119 - 87','291','92','107','17','4','24','84','204','.701','40','9','57','2','.455','3','3','10 - 13']]},
      videos: [['22498168', 'Christner named MGoBlue\'s 2015 Female Breakthrough Athlete of the Year', 'mgoblue'], ['22495315', 'Diving catch double play', 'mgoblue'], ['22493561', 'MGoBlue mid-season feature on Christner', 'mgoblue'], ['2i_0HLTeXe8', 'Christner homers against Alabama for Michigan\'s first run of the 2015 WCWS', '&start=945']]
    },

    SierraLawrence: {
      name: 'Sierra Lawrence',
      image: 'silo_profile.jpg',
      year: 'Senior',
      positions: ['OF'],
      stats: {batting: [['2013','.314','63 - 60','172','47','54','9','2','7','38','88','.512','22','2','23','0','.392','3','3','11 - 13'],['2014','.351','59 - 59','171','49','60','7','1','9','58','96','.561','28','10','16','0','.460','4','1','17 - 20'],['2015','.346','68 - 68','208','82','72','19','0','14','60','133','.639','46','7','20','4','.473','3','1','24 - 25'],['TOTAL','.338','190 - 187','551','178','186','35','3','30','156','317','.575','96','19','59','4','.445','10','5','52 - 58']]},
      info: "<p>Lawrence may be the most underrated player on the team, and, dare I say, the coolest Sierra. Batting gloves? SiLo has no time for your simple luxuries. Up to bat in the final inning of a World Series game? Doesn't matter -- she always appears about five seconds away from curling up on the ground and taking a nap. And that coolness has paid dividends in high pressure situations, like in the deciding game of the ASU regional in 2014, when she tied the game in the seventh inning with solo homer, kicking off one of the most exciting sequences I've ever seen in Michigan sports.</p><p>She is always consistent at the plate, hits lots of dingers, and capable of making highlight-reel plays in the outfield. She was 24-25 on stolen base attempts last season, and the only failure was the result of a blown call. I couldn't dream up a more perfect outfielder.</p>",
      prediction: "Lawrence is a three-year starter and has always been a 'do-everything' type of player, but she has steadily increased her power and speed over the last few seasons. She, Christner, and Susalla are the best overall outfield trio in the country without a doubt."
    },
    TaylorSwearingen: {
      name: 'Taylor Swearingen',
      image: 'swearingen_profile.jpeg',
      year: 'Sophomore',
      positions: ['3B', '1B'],
      stats: {batting: [['2015','.235','36 - 24','68','17','16','1','0','9','18','44','.647','17','2','21','1','.402','0','0','1 - 1'],['TOTAL','.235','36 - 24','68','17','16','1','0','9','18','44','.647','17','2','21','1','.402','0','0','1 - 1']]},
      info: '<p>Swearingen is a tall, powerful hitter who is expected to compete with Montemarano for the starting spot at third base. She earned twelve starts last season at third -- and twelve elsewhere -- but got fewer chances during the second half of the season when Hutch decided to stick with Montemarano-Falk-Blanco at 3B-DP-1B. Still, her numbers were very promising for a freshman.</p>',
      prediction: "Sophomores in the program often improve greatly due the experience against college pitchers and a full year of strength training and personal attention from the coaching staff. If Swearingen shows clear improvement from last season, I think she wins the position."
    },
    TeraBlanco: {
      name: 'Tera Blanco',
      image: 'blanco_profile.jpg',
      year: 'Sophomore',
      positions: ['RHP', '1B'],
      info: "<p>Most pitchers who had success hitting in high school can't carry that over to the college level. Tera Blanco is not one of those pitchers. She did very well at the plate during her freshman season, as well as at first base. She was highly regarded recruit who played top level high school and travel softball in southern California, and is from a family of huge Michigan fans, so Hutch had her locked up in eighth or ninth grade.</p><p>Last season she had very limited opportunities in the circle, as Betsa and Wagner dominated and coaches decided Blanco needed more time to gain strength and shore up her weaknesses. She likes to pitch east-west, mixing power and movement, and jam up hitters on the inside.</p><blockquote>We brought her in to pitch, I didn't bring her here to play first base.<em><a href='http://www.mlive.com/wolverines/index.ssf/2015/06/good_chance_michigans_sara_dri.html'>&#8212; Hutch, following the 2015 season</a></em></blockquote><blockquote>She's a kid with a lot of moxie. And when she's throwing well, and she has that moxie, she has the ability to put the team on her back and say \"let's go.\"<em><a href='myumi.ch/JdvGx'>&#8212; Coach Tholl on WTKA</a></em></blockquote>",
      prediction: "Coach Tholl has said this fall that Blanco is nearly there from a pitching perspective. She pointed to Blanco's changeup as one pitch they're working on in order to tie everything together. Blanco looked good in fall exhibition games, and if she can carry confidence into the season, the sky is the limit. When not pitching, she'll more than likely stay in the batting lineup, at DP or first base.",
      stats: {batting: [['2015','.291','67 - 64','165','27','48','3','0','7','47','72','.436','34','9','24','1','.431','3','7','0 - 0'],['TOTAL','.291','67 - 64','165','27','48','3','0','7','47','72','.436','34','9','24','1','.431','3','7','0 - 0']], pitching: [['2015','0.91','0 - 0','5 - 0','0','0','0','7.2','8','2','1','5','3','1','0','0','29','.276','0','1','0','0','1'],['TOTAL','0.91','0 - 0','5 - 0','0','0','0','7.2','8','2','1','5','3','1','0','0','29','.276','0','1','0','0','1']]},
    },
    SierraRomero: {
      name: 'Sierra Romero',
      image: 'romo_profile.jpg',
      year: 'Senior',
      positions: ['2B', 'SS'],
      stats: {batting: [['2013','.379','64 - 64','182','67','69','11','2','23','71','153','.841','49','9','28','0','.527','1','0','6 - 8'],['2014','.491','62 - 61','165','74','81','11','1','18','72','148','.897','66','3','16','2','.633','3','0','9 - 9'],['2015','.449','68 - 68','176','85','79','11','2','22','83','160','.909','58','12','8','0','.601','2','1','21 - 25'],['TOTAL','.438','194 - 193','523','226','229','33','5','63','226','461','.881','173','24','52','2','.587','6','1','36 - 42']]},
      info: "<p>Romero, nicknamed Romo, or to use her full title, Queen Romo I: Lady of the Seven Inningdoms, Sovereign of All Free Softballers, Conqueror of the Big Ten Conference, Slayer of the Spartans of the North, Tigers of the South, Lions of the East, and Devils of the West, and Besieger of the Book of Records, is the best player in the country. That's about all you need to know.</p><blockquote>Yeah, I think she's better than Derek Jeter. Look at all of her tools. She can swing it, hit it and yeah, he does all that, too. I'm not knocking on Derek Jeter. I'm just suggesting she's just that talented. But what made Derek Jeter was his ability to elevate his team and take them to a lot of championships, and that's her goal.<em><a href='http://www.detroitnews.com/story/sports/college/university-michigan/2015/05/25/romero-michigans-jeter-says-hutchins/27936033/'>&#8212; Hutch</a></em></blockquote>",
      prediction: "First two time winner of MGoBlog's prestigious Chick that Knocks the Fuck Out of the Ball Award. Also, national player of the year. This is a conservative prediction.",
      videos: [['cF-HVOJ0Ngc', 'Romo homers against LSU in the 2015 WCWS', '&start=3008'], ['22498456', 'Romero selected as MGoBlue\'s 2015 female athlete of the year', 'mgoblue']]
    },
    FaithCanfield: {
      name: 'Faith Canfield',
      image: 'canfield_profile.jpg',
      year: 'Freshman',
      positions: ['IF', 'OF'],
      info: "<p>Canfield, from southern California, has shined at the highest levels of high school and travel ball competition. She was twice named offensive player of the year at Pacifica high school in Orange County, and was MVP of her league in 2015. In travel ball, she won three PGF national titles with two different teams (2011-2013), one of which, if I recall correctly, was won on a Canfield walk-off home run. She doesn't have the greatest power or speed, but is the type of player that helps teams win.</p>",
      prediction: "Canfield will be the first or second backup at second and third base. You'll may see her a lot in the top of the fifth inning, replacing Romo at second.",
      videos: [['f3bpxoRxFrI', 'Video interview with Canfield<br>(January 2014)']]
    },
    NataliePeters: {
      name: 'Natalie Peters',
      image: 'peters_profile.jpg',
      year: 'Freshman',
      positions: ['OF', 'IF'],
      info: "<p>Peters is a highly rated, speedy slap hitter from San Diego who will remind fans of Bree Evans or Lyndsay Doyle.</p>",
      prediction: "Outfield and middle infield positions are pretty much set going into the season, so Peters is unlikely to start regularly in the field unless there is an injury. She should be a primary backup and will get opportunities to show what she can do. If she has success, she may get starts at DP. Her slapping can give the lineup a bit of a different look which may be preferable against some opponents. If she doesn't become a regular, I'd guess she'll still be used often as a pinch runner.",
      videos: [['hkK83J5GXhw', 'Video interview with Peters and her travel ball coach (August 2013)']]
    },
    LeahCrockett: {
      name: 'Leah Crockett',
      image: 'crockett_profile.jpg',
      year: 'Freshman',
      positions: ['RHP'],
      info: "<p>Crockett is a right-handed pitcher from the Rochester, N.Y. area, who put up good but not incredible numbers in high school. She's tall -- six feet even, according to MGoBlue -- and has the potential to become pretty good down the road. This makes her something of a long-term project for Coach Brundage, who is, according to Coach Tholl, working with Crockett this Fall to completely break down and rebuild her mechanics.</p>",
      prediction: "Little to no action as she works on overhauling her mechanics. Non-medical redshirts are uncommon in Michigan softball, but would be an ideal case."
    },
    SaraDriesenga: {
      name: 'Sara Driesenga',
      image: 'driesenga_profile.jpg',
      year: 'Senior',
      positions: ['RHP'],
      stats: {batting: [['2012','.340','37 - 37','103','16','35','4','0','6','21','57','.553','22','1','23','0','.457','1','2','0 - 0'],['2013','.246','56 - 54','134','15','33','6','0','4','35','51','.381','38','1','33','0','.409','3','3','0 - 0'],['2014','.207','16 - 10','29','3','6','1','0','2','12','13','.448','7','1','8','0','.368','1','2','0 - 0'],['2015','.154','4 - 4','13','0','2','1','0','0','0','3','.231','0','0','6','0','.154','0','0','0 - 0'],['TOTAL','.272','113 - 105','279','34','76','12','0','12','68','124','.444','67','3','70','0','.412','5','7','0 - 0']], pitching: [['2012','2.53','9 - 10','28 - 23','7','1','3','124.1','124','66','45','45','63','15','0','8','490','.253','5','4','0','0','11'],['2013','1.89','31 - 9','54 - 41','26','8','2','263.1','233','105','71','79','247','19','0','18','1020','.228','8','19','0','1','19'],['2014','2.34','5 - 6','28 - 15','4','3','4','95.2','95','44','32','37','75','10','1','8','379','.251','4','8','0','2','4'],['2015','0.78','4 - 0','7 - 4','3','0','0','27.0','23','5','3','6','20','5','0','1','102','.225','3','0','0','0','4'],['TOTAL','2.07','49 - 25','117 - 83','40','12','9','510.1','475','220','151','167','405','49','1','35','1991','.239','20','31','0','3','38']]},
      info: '<p>Sara Driesenga is coming back for a fifth year. This is a good thing. Driesenga is the pitcher who, as a sophomore in 2013, following an injury to Haylie Wagner, brilliantly carried Michigan to the WCWS -- in the process setting a school record with 54 appearances.</p><p>But Driesenga has since experienced some major setbacks. She spent the 2014 season struggling to find her previous year\'s form, and quickly yielded the role as staff ace back to Wagner. In 2015 it seemed Driesenga had regained her confidence, posting a 4-0 record with a 0.78 ERA, when she suffered a fractured rib. She spent the rest of the season cheering on her teammates from the bench. Now she\'s back for one last go around after qualifying for a medical redshirt, and hoping to capture her former magic.</p><blockquote>There was no question in my mind that I wanted to come back. I did all this hard work to keep developing myself and to keep helping the program as much as I can.<em><a href="https://www.michigandaily.com/section/softball/driesenga-earns-medical-hardship-return-fifth-year">&#8212; Driesenga</a></em></blockquote>',
      prediction: "No idea. The majority opinion on Driesenga is that she gives Michigan another ace starter, with some speculating that she could usurp Megan Betsa as the favored option in the circle at the biggest moments. This is a possibility. More likely, I think, is that she plays a role similar to Haylie Wagner last season: a super-talented secondary option who will get her fair share of starts. Driesenga, though not a lefty, shares a lot in common with Wagner in terms of style -- both are hard throwing contact pitchers with a great dropball, which contrasts sufficiently with Megan Betsa\'s style to make her an ideal replacement if Betsa gets into trouble. It\'s also not entirely unlikely that Tera Blanco has a breakout season which pushes Driesenga to third in the order. One thing I am sure of is that Driesenga will be a great leader and asset to the team no matter how it shakes out.<br><br>As far as batting goes, don\'t expect to see her out there much. She hit regularly as a freshman and sophomore, and did reasonably well, but her numbers have declined significantly each season. With the amount of offensive talent on this team, there is simply no good reason for her to hit."
    },
    NatalieHarper: {
      name: 'Natalie Harper',
      image: 'harper_profile.jpeg',
      year: 'Age Eleven',
      positions: ['Teammate'],
      info: "<p><a href='http://www.michigandaily.com/sports/harper-along-ride-michigan-softball'>Read this</a></p>",
      prediction: 'Awesomeness',
      videos: [['nIr3GB_6NSw', 'Watch this']]
    },
    NikkiWald: {
      name: 'Nikki Wald',
      image: 'wald_profile.jpg',
      year: 'Sophomore',
      positions: ['Pinch Runner'],
      info: "<p>Wald is a very good pinch runner who was recruited specifically for that purpose. <a href='http://www.wzzm13.com/story/sports/high-school/farmington/2015/06/16/dream-come-true-michigans-nikki-wald/28836437/'>Here's a great story on her if you're interested in the life of a pinch runner.</a> They are valued highly at Michigan.</p>",
      prediction: "She and Sbonek should be the top two pinch runners and as such will play in most games.",
      videos: [['cF-HVOJ0Ngc', 'Wald\'s baserunning ties the game against LSU in the 2015 WCWS', '&start=4606']]
    },
    MarySbonek: {
      name: 'Mary Sbonek',
      image: 'sbonek_profile.jpg',
      year: 'Senior',
      positions: ['Pinch Runner'],
      info: "<p>Pinch running specialist. Hutch values baserunning highly and Wald, Sbonek, and Richvalsky will fill important roles.</p>",
      prediction: 'Should be the first or second pinch runner off the bench and will play in most games.'
    },
    LaurenConnell: {
      name: 'Lauren Connell',
      image: 'connell_profile.jpg',
      year: 'Senior',
      positions: ['Catcher'],
      info: "<p>Connell is a favorite of many fans because she writes <a href='http://www.mgoblue.com/sports/w-softbl/spec-rel/061015aaa.html'>a great blog called Inside Pitch</a> for MGoBlue, and is quite good at starting and directing waves in the crowd.</p>",
      prediction: "Connell will likely serve as a bullpen catcher as long as it doesn't interfere with her important work of getting everyone hyped. And more awesome blogs, which you should all read."
    },
    OliviaRichvalsky: {
      name: 'Olivia Richvalsky',
      image: 'richvalsky_profile.jpg',
      year: 'Senior',
      positions: ['Pinch Runner'],
      info: "<p>One third of the pinch running platoon, along with Mary Sbonek and Nikki Wald.</p>",
      prediction: "Pinch running is serious business at Michigan and Richvalsky should get opportunities in quite a few games."
    },
    MorganSwift: {
      name: 'Morgan Swift',
      image: 'swift_profile.jpg',
      year: 'Sophomore',
      positions: ['C'],
      info: "<p>Swift went to open tryouts last year and made the team, which obviously makes her the fan favorite underdog. She is from Caledonia in western Michigan, where <a href='http://www.mlive.com/kentwood/index.ssf/2014/11/morgan_swift_named_to_u-of-m_s.html'>according to this article</a>, she is known as \"the greatest softball player to ever play for Caledonia High School.\" And that's no joke! As a pitcher she had an ERA of 0.22 in league games, and recorded 209 strikeouts to only 5 walks during her senior season. Apparently Michigan coaches used her as a bullpen catcher and BP pitcher during her first year.</p>",
      prediction: "Either Swift continues in her current role, or she gets a chance in the circle and no hits every team she faces to become player of the year and an all time Michigan legend."
    },
    EmilyHepker: {
      name: 'Emily Hepker',
      image: 'hepker_profile.jpg',
      year: 'Unlimited Eligibility',
      positions: ['Teammate'],
      info: "<p><a href='http://espn.go.com/espnw/news-commentary/article/12983400/trip-lifetime-michigan-inspirational-teammate'>Read this</a></p>",
      prediction: 'Another trip to Oklahoma City.'
    },
    CourtneyRichardson: {
      name: 'Courtney Richardson',
      image: 'richardson_profile.jpg',
      year: 'Freshman',
      positions: ['OF'],
      info: "<p>Played at Maine South High School in the Chicago area, where she was a four year starter. Two time Pioneer Press All-Area First Team pick and was named to the Illinois Coaches Association Class 4A all-state second-team as a senior, batting .448 with 32 RBIs.</p><blockquote>She not only would practice with us, but she would work with her family to get a little extra in. You could drive past a field at any time and see her getting an extra round or two of hitting in. She became more of a vocal leader in her last season with us, but she always was a leader by example.<em><a href='http://www.chicagotribune.com/suburbs/park-ridge/sports/ct-dch-courtney-richardson-michigan-maine-south-tl-0625-20150624-story.html'>&#8212; Maine South coach Emmy Pasier</a></em></blockquote>",
      prediction: "Tinley Park native Bonnie Tholl has helped pull in a couple of very good players from Chicagoland recently in Abby Ramirez and Kelly Christner (who actually attended the same High School as Tholl), but it's unlikely Richardson will see much time in 2016.",
      videos: [['8jLv1bbWiMo', 'Old skills video from 2013 scouting camp']]
    },
    MackenzieNemitz: {
      name: 'Mackenzie Nemitz',
      image: 'nemitz_profile.jpg',
      year: 'Freshman',
      positions: ['IF'],
      info: "<p>Nemitz played at Lake Shore High School in St. Clair Shores (northeast Metro Detroit). As a Junior she hit .566 and was selected to the All-State first team in Division 1 (joining fellow freshmen Alex Sobczak and Katie Alexander).</p><p>For those wondering: Yes, Mackenzie Nemitz is former All-American pitcher and current assistant coach Nikki Nemitz's sister. I\'d rather not dwell on that relationship &#8212; Mackenzie deserves to be recognized for her own accomplishments &#8212; but this 2007 Daily story on Nikki's recruitment, <a href='http://www.michigandaily.com/content/little-sister-deciding-factor'>\"Little sister a deciding factor,\"</a> is just awesome. At the very least, check out the quotes below.</p><blockquote>We went to (the Nemitz) home and Mackenzie gave us a card. It was a University of Michigan card, that Mackenzie, who's now 10 years old, had made up. It said, 'University of Michigan is the best. Why would you want to go to any other school?' And this was three weeks to a month before her sister (Nikki) made her decision.<em>&#8212; Bonnie Tholl, April 2007</em></blockquote><blockquote>I said, 'Mackenzie, when are we going to get Nikki to make her decision?'<br>She says (hesitantly), 'Well, you know.'<br>I said, '(But) you're going to come right?'<br>'Oh yeah.'<em>&#8212; Hutch, April 2007</em></blockquote>",
      prediction: "It will be difficult to break into a crowded infield as a freshman, but Nemitz will certainly contend for a starting spot later in her Michigan career.",
      videos: [['Aubt8y40SFg', 'Old skills video (2012)']]
    },
    KatieAlexander: {
      name: 'Katie Alexander',
      image: 'alexander_profile.jpg',
      year: 'Freshman',
      positions: ['C'],
      info: "<p>Alexander is a local player with great size and power who will walk on with the team. She put up huge numbers at Saline High School and earned a bevy of awards, including first team All-State twice and Academic All-State in each of her four years. Her high school coach was Alicia Seegert, one of the best catchers in Michigan history, who was a first team All-American and set a Big Ten batting average record that stood for eight years. Interestingly, her school principal also caught for the Wolverines.</p>",
      prediction: "According to Coach Tholl, Alexander was brought in to be a bullpen catcher, but quickly exceeded expectations this Fall and is now an option for real playing time behind the plate. However, with Sobczak (Freshman) and Falk (Sophomore), the team already has highly regarded underclassmen that can play the position. I anticipate Falk sticking to 1B or DP next season, so I've put Alexander at #2 on the depth chart. The biggest question here is how effective she can be as a hitter at this level. If she's close to Sobczak's ability, we could even see a lineup reshuffle in which Alexander gets the nod behind the plate and Sobczak takes over at third. If it takes Alexander some time to adapt to college pitching, it may be that Falk would be the one to step in for Sobczak in case of injury (as we saw last season when Falk did well following Lauren Sweet's injury). Projecting past this season, Alexander certainly has the potential to earn a scholarship and a regular spot on the field later in her career, whether it be at catcher or somewhere else.",
      videos: [['yOTqW7OmicM', 'Hits a dinger', '&start=36']]
    }
  };

  var Positions = {
    pitcher: [
      Players.MeganBetsa,
      Players.SaraDriesenga,
      Players.TeraBlanco
    ],

    catcher: [
      Players.AlexSobczak,
      Players.KatieAlexander,
      Players.AidanFalk
    ],

    first: [
      Players.AidanFalk,
      Players.TeraBlanco,
      Players.TaylorSwearingen
    ],

    second: [
      Players.SierraRomero,
      Players.AmandaVargas,
      Players.FaithCanfield
    ],

    shortstop: [
      Players.AbbyRamirez,
      Players.NataliePeters,
      Players.AmandaVargas
    ],

    third: [
      Players.LindsayMontemarano,
      Players.TaylorSwearingen,
      Players.FaithCanfield
      // Players.AlexSobczak
    ],

    lf: [
      Players.KellyChristner,
      Players.NataliePeters,
      Players.FaithCanfield
    ],

    cf: [
      Players.SierraLawrence,
      Players.NataliePeters,
      Players.FaithCanfield
    ],

    rf: [
      Players.KelseySusalla,
      Players.NataliePeters,
      Players.FaithCanfield
    ],

    dp: [
      Players.TeraBlanco,
      Players.TaylorSwearingen,
      Players.AmandaVargas,
      Players.NataliePeters,
      Players.FaithCanfield,
      // Players.TaylorSwearingen
    ],
    bm: [
      Players.LaurenConnell,
      Players.LeahCrockett,
      Players.NatalieHarper,
      Players.EmilyHepker,
      Players.MackenzieNemitz,
      Players.CourtneyRichardson,
      Players.OliviaRichvalsky,
      Players.MarySbonek,
      Players.MorganSwift,
      Players.NikkiWald
    ]
  };
})();
