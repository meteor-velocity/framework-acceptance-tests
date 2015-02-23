Feature: Mocha user journey


  Scenario: User starts Mocha for the 1st time
    Given I run "rm -rf leaderboard"
    And I run "meteor create leaderboard"
    And I cd to "./leaderboard"
    And I run "meteor add mike:mocha"
    And I start meteor
    When I navigate to "http://localhost:3030"
    And I click the Velocity reporter button
    Then I should see "0 tests passed" in the Velocity reporter
    And I should see a button labelled "Add mocha sample tests"
