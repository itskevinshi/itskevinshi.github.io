// Fun Facts Rotator - Displays a new fact each day
"use strict";

document.addEventListener('DOMContentLoaded', function() {
  const funFactElement = document.getElementById('daily-fun-fact');
  if (!funFactElement) return;
  
  // List of fun facts about myself
  const funFacts = [
    "I love Herman Miller and own an Embody chair which I bought for $10 from my university's surplus store.",
    "I used to participate in obscure online competitions, which is how I got my first gaming setup.",
    "Audiobooks are the primary way I experience books.",
    "I used to play the piano, and would like to start again once I get my own place.",
    "The highest rank I ever achieved in Rocket League was Grand Champion 3... in Rumble.",
    "Shortcat (a Mario Kart 8 Deluxe YouTuber) was my most watched YouTube creator in 2024, even though I don't own a Nintendo Switch.",
    "Samsung > Apple.",
    "I love photographing wildlife, especially bugs, and uploading them to iNaturalist.",
    "I trade and invest in video game items, and have profited over $6000 from it.",
    "I won my current laptop (a Razer Blade 14) in a giveaway.",
    "When I visited China in 2024, I realized how much cooler their EVs",
    "My most viewed YouTube video is a clip from an anime called 'Kaguya-sama: Love is War'. It has nearly 500k views.",
    "In high school, my favorite club was Scholastic Bowl.",
    "High school started at 7:20 AM, and I had to wake up at 5:30 AM to catch the bus, which I consider cruel and unusual punishment.",
    "My current phone is a Samsung Galaxy S22 Ultra.",
    "Before Samsung, I used budget Chinese phones, from Xiaomi, Huawei, LeTV, etc.",
    "I was obsessed with rollercoasters as a kid, and still keep up with the latest news.",
    "The tallest rollercoaster I have ridden is Superman: Escape from Krypton at Six Flags Magic Mountain (now closed unfortunately).",
    "I was able to ride Volcano: The Blast Coaster at Kings Dominion before it closed.",
    "I never rode The Big Bad Wolf at Busch Gardens, even though it is my home park.",
    "I love video editing, and practice by making (mediocre) Valorant montages.",
    "My first video editing software was Windows Movie Maker.",
    "My first laptop was a Dell Inspiron with a Celeron processor, 2GB of RAM, and 32GB of storage...",
    "...in order to play any slightly demanding game, I had to use GeForce Now, which I was a beta tester for.",
    "I owned some of the worst tech products ever, including an HP TouchPad and Verizon Kin 2.",
    "I was obsessed with earning money in any way I could as a kid, probably fueled by the trading system in Rocket League...",
    "I used to earn money arbitrage trading in video games, selling CS:GO skins for Rocket League keys, Rocket League keys for TF2 keys, then TF2 keys for more CS:GO skins.",
    "I used to mine Ether, when it was still possible. At one point, I was earning $6 a day!",
    "I've played nearly every Fire Emblem Game, and my favorite is Fire Emblem: The Blazing Blade.",
  ];
  
  // Get the current day of the year to determine which fact to show
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Calculate which fact to show (cycling through the list)
  const factIndex = dayOfYear % funFacts.length;
  
  // Display the fact without animations
  funFactElement.textContent = funFacts[factIndex];
});
