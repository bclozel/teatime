
define(['teatime','moment'],function(teatime, moment){

    describe('Teatime', function(){

        describe('#isTeaTime()', function(){

            it('should return false and next:breakfast for 7:00', function(){

                var time = moment().hour(7).minute(0);

                var answer = teatime.isTeaTime(time);

                assert.equal(false, answer.isTeaTime);
                assert.equal(8, answer.next.start.hours);
            });

            it('should return true and current:breakfast for 8:00', function(){

                var time = moment().hour(8).minute(0);

                var answer = teatime.isTeaTime(time);

                assert.equal(true, answer.isTeaTime);
                assert.equal(8, answer.current.start.hours);
            });


            it('should return false and next:breakfast (next day) for 22:00', function(){

                var time = moment().hour(22).minute(0);

                var answer = teatime.isTeaTime(time);

                assert.equal(false, answer.isTeaTime);
                assert.equal(8, answer.next.start.hours);
            });

            it('should return false and next:afternoon for 12:00', function(){

                var time = moment().hour(12).minute(0);

                var answer = teatime.isTeaTime(time);

                assert.equal(false, answer.isTeaTime);
                assert.equal(16, answer.next.start.hours);
            });
        });
    });

});