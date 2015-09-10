const noop = () => {};
const always = () => true;

function *enumerate( collection )
{
    let i = 0;

    for ( let item of collection )
    {
        yield [item, i++, ];
    }
}

export function wrap( collection )
{
    return enumerate( collection );
}

export function unwrap( collection )
{
    const unwrapped = [];
    for ( let item of collection )
    {
        unwrapped.push( item );
    }
    return unwrapped;
}

export const identity = id => id;

export function *forEach( iteratee=noop, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        yield iteratee( item, i );
    }
}

export function *map( transform=identity, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        yield transform( item, i );
    }
}

export function *filter( predicate=always, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        if ( predicate( item, i ) )
        {
            yield item;
        }
    }
}

export function reduce( transform, collection, initial )
{
    let acc = initial;
    let ignore = acc === undefined;

    for ( let [item, i] of enumerate( collection ) )
    {
        if ( ignore )
        {
            ignore = false;
            continue;
        }

        acc = transform( acc, item, i );
    }

    return acc;
}

export function *pluck( property, collection )
{
    for ( let item of collection )
    {
        yield item[property];
    }
}

export function *invoke( property, collection )
{
    for ( let item of collection )
    {
        yield item[property]();
    }
}

export function *take( size, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        if ( i < size )
        {
            yield item;
            continue;
        }
        break;
    }
}

export function *takeWhile( predicate=always, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        if ( predicate( item, i ) )
        {
            yield item;
            continue;
        }
        break;
    }
}

export function *drop( size, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        if ( i < size )
        {
            continue;
        }
        yield item;
    }
}

export function *dropWhile( predicate=always, collection )
{
    for ( let [item, i] of enumerate( collection ) )
    {
        if ( predicate( item, i ) )
        {
            continue;
        }
        yield item;
    }
}

export function first( collection )
{
    for ( let item of collection )
    {
        return item;
    }
}

export function last( collection )
{
    let item;
    for ( item of collection )
    {
        continue;
    }

    return item;
}

export function compact( collection )
{
    return filter( identity, collection );
}

export function *sequence( begin=0, max=Infinity, step=1 )
{
    for ( let i = begin; i < max; i += step )
    {
        yield i;
    }
}
