Feature: Mocha user journey


  Scenario: User adds sample tests for mocha and sees successful output in reporter
    Given I run "rm -rf leaderboard"
    And I run "meteor create leaderboard"
    And I cd to "./leaderboard"
    And I run "meteor add mike:mocha"
    And I start meteor
#    When I navigate to "http://localhost:3000"
#    Then I should see a green dot in the the velocity html reporter
#    And I click the green dot
#    And I should see "2 tests passed" in the Velocity reporter


