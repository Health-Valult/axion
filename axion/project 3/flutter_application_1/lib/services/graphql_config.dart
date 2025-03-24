import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_application_1/services/session_service.dart';
import 'package:flutter_application_1/services/env_config.dart';


class GraphQLConfig {
  static String token = '';
  static final SessionService _sessionService = SessionService();
  
  static final HttpLink httpLink = HttpLink(
    EnvConfig.graphqlUrl,
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
  );

  static final AuthLink authLink = AuthLink(
    getToken: () async {
      try {

        if (token.isNotEmpty) {
          return 'Bearer $token';
        }
        

        final sessionToken = await _sessionService.getSessionToken();
        if (sessionToken != null) {
          token = sessionToken; 
          print('Auth token for GraphQL: Present');
          return 'Bearer $sessionToken';
        }
        print('Auth token for GraphQL: Not found');
        return null;
      } catch (e) {
        print('Error getting auth token: $e');
        return null;
      }
    },
  );

  static final Link link = authLink.concat(httpLink);


  static GraphQLClient client = GraphQLClient(
    cache: GraphQLCache(
      store: InMemoryStore(),
      dataIdFromObject: (object) => null,  
    ),
    link: link,
    defaultPolicies: DefaultPolicies(
      query: Policies(
        fetch: FetchPolicy.networkOnly,
      ),
      mutate: Policies(
        fetch: FetchPolicy.networkOnly,
      ),
      subscribe: Policies(
        fetch: FetchPolicy.networkOnly,
      ),
    ),
  );


  static ValueNotifier<GraphQLClient> initializeClient() {
    return ValueNotifier(
      GraphQLClient(
        cache: GraphQLCache(
          store: InMemoryStore(),
          dataIdFromObject: (object) => null,  
        ),
        link: link,
        defaultPolicies: DefaultPolicies(
          query: Policies(
            fetch: FetchPolicy.networkOnly,
          ),
          mutate: Policies(
            fetch: FetchPolicy.networkOnly,
          ),
          subscribe: Policies(
            fetch: FetchPolicy.networkOnly,
          ),
        ),
      ),
    );
  }

 
  static void updateToken(String newToken) {
    token = newToken;
    client = GraphQLClient(
      cache: GraphQLCache(
        store: InMemoryStore(),
        dataIdFromObject: (object) => null, 
      ),
      link: link,
      defaultPolicies: DefaultPolicies(
        query: Policies(
          fetch: FetchPolicy.networkOnly,
        ),
        mutate: Policies(
          fetch: FetchPolicy.networkOnly,
        ),
        subscribe: Policies(
          fetch: FetchPolicy.networkOnly,
        ),
      ),
    );
  }
}
