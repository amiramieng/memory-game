(function ($, root, undefined) {

    const cards = $('.memory-card');

    //console.log(cards);

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let score = 0;
    let turns = 3;

    function flipCard(card) {
        if(lockBoard) return;
        if(card === firstCard) return;

        $(card).addClass('flip');

        if(!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = card;

            return;
        }

        secondCard = card;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = $(firstCard).data('card') === $(secondCard).data('card');

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        score++;
        updateScore(turns, score);

        $('.match').fadeIn(0);

        $(firstCard).prop("onclick", null).off("click");
        $(secondCard).prop("onclick", null).off("click");

        setInterval(function() {
            $('.match').fadeOut(300);
        }, 1200);

        resetBoard();
    }

    function unflipCards() {
        turns--;
        updateScore(turns);

        lockBoard = true;

        setTimeout(() => {
            $(firstCard).removeClass('flip');
            $(secondCard).removeClass('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        checkScore();

        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffle() {
        cards.each(function(i, card) {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    }

    function checkScore() {
        if(turns <= 0 || score == 6) {
            cards.each(function(i, card) {
                $(card).prop("onclick", null).off("click");
            });

            $('.game-over').fadeIn(0);

            $('.restart').on('click', function() {
                restartGame();
            })
        }
    }

    function updateScore(turns, score) {
        $('.turns').html(turns);
        $('.score').html(score);
    }

    function restartGame() {
        $('.game-over').fadeOut(0);
        turns = 3;
        score = 0;

        updateScore(3, 0);

        cards.each(function(i, card) {
            $(card).removeClass('flip');

            $(card).on('click', function() {
                //console.log(card);
                flipCard(card);
            });
        });

        shuffle();
    }

    cards.each(function(i, card) {
        $(card).on('click', function() {
            //console.log(card);
            flipCard(card);
        });
    });

    $(function () {

        'use strict';

        shuffle();



    });

})(jQuery, this);
